import axios from "axios";
import { apiKey } from "../apikey";

const ticketMasterAPI = axios.create({
  baseURL: "https://app.ticketmaster.com/discovery/v2/events",
});

const fanFinderAPI = axios.create({
  baseURL: "https://fanfinder-api-tzm2.onrender.com/api"
  
})

export const getGigs = (lat, long) => {
  // get todays date into the correct format for making calls to the ticketmaster api
  const currentDate = new Date();
  const fromNow = currentDate.toISOString().slice(0, 19) + "Z"; // lop off the millisecs & replace the Z
  const untilMidnight = currentDate.toISOString().slice(0, 11) + "23:59:59Z"; // hardcode until midnight of the current day

  // just queries with getGigs, no path
  let path = "";

  return ticketMasterAPI
    .get(path, {
      params: {
        apikey: apiKey,
        latlong: `${lat},${long}`,
        radius: 30, // defaults to 25miles if not queried
        locale: "*",
        segmentName: "Music",

        // startDateTime: fromNow,
        // endDateTime: untilMidnight,

        size: 200, // max number of results returned; 200 is the limit from the API, unless we deal with pagination
        // <--- this is where we could add queries for specific genres (genreID) or subgenres (subGenreID)
      },
    })
    .then((results) => {
      return results.data._embedded.events; // array of all gigs
    });
};

export const getGigById = (gig_id) => {
  let path = `${gig_id}?`;
  return ticketMasterAPI.get(`/${path}apikey=${apiKey}`).then((results) => {
    return results.data;
  });
};

export const getGigComments = (gigId) => {
  let path = `/gigs/${gigId}/comments`;
  return fanFinderAPI.get(`/gigs/${gigId}/comments`).then((results) => {
    return results.data.comments;
  });
};

export const postComment = ({ id, commentText }) => {
  console.log(id, "id from api");
  console.log(commentText, "comment from api");
  return fanFinderAPI
    .post(`/gigs/${id}/comments`, {
      gig_id: id,
      user: "Team_Express",
      text: commentText,
      created_at: new Date(),
    })
    .then((results) => {
      console.log(results.data.comment, "results in api");
      return results.data.comment;
    })
    .catch((err) => {
      console.log(err, "<< err");
    });
};

export const getUserGigs = () => {
  console.log("gigs");
  return fanFinderAPI
    .get(`/users/Team_Express/gigs`)
    .then((results) => {
      // console.log(results.data.gigs, "these are the users gigs");
      return results.data.gigs;
    })
    .catch((err) => {
      console.log(err);
    });
};

export const patchUserGigs = (gigId) => {
  // console.log("doing a patch to users gigs");
  return fanFinderAPI
    .patch("/users/Team_Express/gigs", { gig_id: gigId })
    .then((result) => {
      // console.log("hi from line 92")
      return result.data;
    });
};


export const getAllAttendees = (gigId) => {
  // console.log("getting all attendees");
  return fanFinderAPI
    .get(`/gigs/${gigId}/fans`)
    .then((results) => {
      //  console.log(results.data.fans, "these are users going to this gig");
      return results.data.fans;
    })
    .catch((err) => {
      console.log(err);
    });
};

// export const getGigComments = (gigId) => {
//   let path = `/gigs/${gigId}/comments`;
//   return fanFinderAPI.get(`/gigs/${gigId}/comments`).then((results) => {
//     return results.data.comments;
//   });
// };
// export const getGigById = (gig_id) => {
//   let path = `${gig_id}?`;
//   return ticketMasterAPI.get(`/${path}apikey=${apiKey}`).then((results) => {
//     return results.data;
//   });
// };

// fanfinder api

export const getUserChatIds = (user = "Team_Express") => {

  return fanFinderAPI
    .get(`/users/${user}/chats`)
    .then((results => {
      console.log(results.data.chats, "api results")
      return results.data.chats
    }))

  // return ["chat-1", "chat-2", "chat-3"];
}

export const getUsersByChatId = (id = "chat-1") => {
// need  to stop using this endpoint
  const chats = {
    "chat-1": ["testUser", "Geoff"],
    "chat-2": ["testUser", "Kate"],
    "chat-3": ["testUser", "BlueShoes"]
  }

  return chats[id]
}

export const getChatHistoryById = (id = "chat-1") => {
  
  return fanFinderAPI
  .get(`/users/Team_Express/${id}`)
  .then((results) => {
    return results.data.chat_history
  })
}

export const postMessageToChat = (message, user, chat_id) => {
  console.log('trying to post message : ', message, user, chat_id )
  return fanFinderAPI
    .post(`/users/${user}/${chat_id}`, {"message": message})
    .then((result)=>{
      console.log(result.status, "<sent a message?")
      return result
    })

}

export const getSocketServerAddress = () => {
  return 'https://fanfinder-api-tzm2.onrender.com'
  
}

export const getUserDetails = (user_id) => {
  return fanFinderAPI
    .get(`/users/${user_id}`)
    .then((result)=>{
      return result
    })
}