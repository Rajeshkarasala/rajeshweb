async function postData(url = '', auth, data = {}) {
    const response = await fetch(url, {
      method: 'POST',
      mode: 'cors',
      headers: {
        'Authorization': auth,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    return await response.json();
  };
  
  // method to sha256 encode string
  async function sha256(message) {
    const msgBuffer = new TextEncoder('utf-8').encode(message);
    const hashBuffer = await crypto.subtle.digest('SHA-256', msgBuffer);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map(b => ('00' + b.toString(16)).slice(-2)).join('');
  }
  
  // Post data when form is submitted
  submitForm = async function() {
    // Get data from query string
    const queryParams = new URLSearchParams(document.location.search);
    const userId = queryParams.get('userId');
    const conversationId = queryParams.get('convId');
    const botId = queryParams.get('botId');
//  const conversationId = "da251876-59eb-4bc5-8555-cf4626ef9dce";
//      const botId = "59b84518-55ca-4d9f-bb9f-8ff5d8b2fe00";
      
    // Get data from form
    const leave_type = document.querySelector('select[name="leave_type"]').value;

    const from_date = document.querySelector('input[name="from_date"]').value;

    const to_date = document.querySelector('input[name="to_date"]').value;

    const reason = document.querySelector('textarea[name="reason"]').value;

    const approver_email = document.querySelector('input[name="approver_email"]').value;
       
      
    console.log(leave_type);
    console.log(from_date);
    console.log(to_date);
    console.log(reason);
    console.log(approver_email);

  
    // use correct domain for your region
    const domain = 'https://va.bc-intg.liveperson.net/thirdparty-services-0.1/webview';
    
    // encode auth string
    const authString = `${conversationId} || ${botId}`;
    const auth = await sha256(authString);
  
    const res = await postData(domain, auth, {
      botId,
      conversationId,
      userId,
      message: "OverDueConv", // optional
      contextVariables: [
        {"name": "leave_type", "value": leave_type},
        {"name": "from_date", "value": from_date},    
           {"name": "to_date", "value": to_date},
           {"name": "reason", "value": reason},
          {"name": "approver_email", "value": approver_email}
      ],
    });
       window.close();     
  }
