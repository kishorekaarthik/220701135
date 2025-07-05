import fetch from 'node-fetch';

const register = async () => {
  const payload = {
    email: "yourcollegeemail@example.edu",   
    name: "Your Full Name",                  
    mobileNo: "9876543210",                 
    githubUsername: "yourGithubUsername",    
    rollNo: "CSE1234",                        
    accessCode: "ABCDEF123"                  
  };

  try {
    const res = await fetch("http://20.244.56.144/evaluation-service/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });

    const data = await res.json();
    console.log("Registration Successful!");
    console.log("Client ID: ", data.clientID);
    console.log("Client Secret: ", data.clientSecret);
  } catch (err) {
    console.error("Registration Failed:", err.message);
  }
};

register();
