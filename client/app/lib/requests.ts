
    export async function getUser() {
    return fetch("http://localhost:8000/auth/get-user", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("access")}`,
      },
    });
  }
  
  export async function getGroups() {
    return fetch("http://localhost:8000/group/groups", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("access")}`,
      },
    });
  }
  
  export async function createGroup(data: any) {
    return fetch("http://localhost:8000/group/groups", {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("access")}`,
      },
    });
  }
  
  export async function getGroupById(data: any) {
    return fetch("http://localhost:8000/group/groups/" + data, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("access")}`,
      },
    });
  }
  
  export async function addPostToGroup(id: any, data: any) {
    console.log(id, data);
    return fetch("http://localhost:8000/group/groups/" + id + "/posts", {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("access")}`,
      },
    });
  }
  
  export async function addCommentToPost(id: any, postId: any, data: any) {
    console.log(id, data);
    return fetch(
      "http://localhost:8000/group/groups/" +
        id +
        "/posts/" +
        postId +
        "/comments",
      {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("access")}`,
        },
      }
    );
  }
  
  export async function createForumPost(data: {
    user: string;
    question: string;
    answer: string;
  }) {
    console.log(data);
    return fetch("http://localhost:8000/forum/forum", {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("access")}`,
      },
    });
  }
  
  export async function getAllForumPosts() {
    return fetch("http://localhost:8000/forum/forum", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("access")}`,
      },
    });
  }
  
  export async function updateProfile(profileData: any): Promise<Response> {
    return fetch("http://localhost:8000/profile/update", {
      method: "PUT",
      body: JSON.stringify(profileData),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("access")}`,
      },
    });
  }
  