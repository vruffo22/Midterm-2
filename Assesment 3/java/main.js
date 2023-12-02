
//select google boton

window.addEventListener("load", function () {
    this.document
      .getElementById("sing-in-google")
      .addEventListener("click", function () {
        var provider = new firebase.auth.GoogleAuthProvider();
        provider.addScope("email");
        firebase
          .auth()
          .signInWithPopup(provider)
          .then(function (result) {
            console.log("Loggin sucessfully", result.user);
          })
          .catch(function (error) {
            console.log("Loggin fail", error);
          });
      });
  
    document.getElementById("sing-in-traditional").addEventListener("click", function () {
       
        var emailtxt = document.getElementById('email').value;
        var passtxt = document.getElementById('password').value;

        firebase.auth().signInWithEmailAndPassword(emailTxt, passtxt)
         .then((usercredential) => {

            var user = usercredential.user;

            console.log('logging sucessfully');
         })
        
         .catch((error) => {
            var errorcode = error.code;
            var errormessage = error.message;
            console.log('logging fail',error );
         })
      });
});

this.document
    .getElementById("sing-in-phone")
    .addEventListener("click", function () {
      window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier(
        "recaptcha-container",
        {
          size: "invisible",
          callback: (response) => {
            // reCAPTCHA solved, allow signInWithPhoneNumber.
            onSignInSubmit();
          },
        }
      );
      const phoneNumber = "+16047200257";

      const appVerifier = window.recaptchaVerifier;
      firebase
        .auth()
        .signInWithPhoneNumber(phoneNumber, appVerifier)
        .then((confirmationResult) => {
          // SMS sent. Prompt user to type the code from the message, then sign the
          // user in with confirmationResult.confirm(code).
          window.confirmationResult = confirmationResult;
          console.log("Loggin sucessfully", confirmationResult);
        })
        .catch((error) => {
          console.log("Loggin fail", error);

          grecaptcha.reset(window.recaptchaWidgetId);
        });
    });