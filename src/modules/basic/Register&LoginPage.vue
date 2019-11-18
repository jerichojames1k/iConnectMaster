<template>
  <div id="body">
    <b-container fluid>
      <b-row id="row">
        <b-col></b-col>
        <b-col id="top" cols="6">
          <b-form @submit="onSubmit">
            <center>
              <h1>Sign In</h1>
              <p>
                <b>
                  <i>Get account for free</i>
                </b>
              </p>
              <div>
                <img src="~assets/logoTrans.png" fluid />
              </div>
            </center>
            <b-form-group id="input-group-0" label="Username:" label-for="input-0">
              <b-form-input
                class="input"
                id="input-0"
                v-model="form.username"
                type="text"
                required
                placeholder="Username"
              ></b-form-input>
            </b-form-group>

            <b-form-group id="input-group-1" label="Email:" label-for="input-1">
              <b-form-input
                class="input"
                id="input-1"
                v-model="form.email"
                type="email"
                required
                placeholder="Email"
              ></b-form-input>
            </b-form-group>

            <b-form-group id="input-group-2" label="Password:" label-for="input-2">
              <b-form-input
                class="input"
                id="input-2"
                v-model="form.password"
                required
                placeholder="Password"
                type="password"
              ></b-form-input>
            </b-form-group>

            <b-form-group id="input-group-3" label="Confirm Password:" label-for="input-3">
              <b-form-input
                class="input"
                id="input-3"
                v-model="form.confirmPassword"
                required
                placeholder="Confirm Password"
                type="password"
              ></b-form-input>
            </b-form-group>
           <center>
      <p>
        By clicking Sign Up, you agree to our
        <a
          href="#"
          v-b-modal.modal-scrollable
          @click="show=true"
        >Terms & Conditions</a>
      </p>
      <!-- <b-modal
        id="modal-scrollable"
        scrollable
        title="Our Terms & Conditions"
        ok-only
        no-stacking
        @ok="handleOk"
      >
      </b-modal> -->
        <div>
    
    <b-modal   
       scrollable title="Our Terms and Conditions"
       id="modal-scrollable" 
       v-model="show">
            <p>
          Iconnect Terms of Service ("Agreement")
          This Agreement was last modified on September 20, 2013.
          Please read these Terms of Service completely using iconnectblog.com which is owned and operated by Iconnect. This Agreement documents the legally binding terms and conditions attached to the use of the Site at iconnectblog.com.
          By using or accessing the Site in any way, viewing or browsing the Site, or adding your own content to the Site, you are agreeing to be bound by these Terms of Service.
          </p>
          <ul>
            <li> Intellectual Property</li>
            <p>The Site and all of its original content are the sole property of Iconnect and are, as such, fully protected by the appropriate international copyright and other intellectual property rights laws.
            </p>
            <li> Termination</li>
            <p>Iconnect reserves the right to terminate your access to the Site, without any advance notice.Links to Other Websites
          Our Site does contain a number of links to other websites and online resources that are not owned or controlled by Iconnect.
          Iconnect has no control over, and therefore cannot assume responsibility for, the content or general practices of any of these third party sites and/or services. Therefore, we strongly advise you to read the entire terms and conditions and privacy policy of any site that you visit as a result of following a link that is posted on our site.</p>
            <li>Governing Law</li>
            <p>This Agreement is governed in accordance with the laws of Philippines.</p>
            <li>Chages to This Agreement</li>
            <p>Iconnect reserves the right to modify these Terms of Service at any time. We do so by posting and drawing attention to the updated terms on the Site. Your decision to continue to visit and make use of the Site after such changes have been made constitutes your formal acceptance of the new Terms of Service.
          Therefore, we ask that you check and review this Agreement for such changes on an occasional basis. Should you not agree to any provision of this Agreement or any changes we make to this Agreement, we ask and advise that you do not use or continue to access the Iconnect site immediately.</p>
            <li>Contact Us</li>
            <p>   If you have any questions about this Agreement, please feel free to contact us at info@iconnect.com.</p>
          </ul>
      <template v-slot:modal-footer>
        <div class="w-100">
          <b-button
            id="modal"
            size="sm"
            class="float-right"
            @click="show=false"
            type="dark"
          >
            Close
          </b-button>
        </div>
      </template>
    </b-modal>
  </div>
      <b-button id="login" type="submit">Sign Up</b-button>
    </center>
            <br />
          </b-form>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import AUTH from "services/auth";
import $ from "jquery";
export default {
  data() {
    return {
      auth: AUTH,
      form: {
        username: "",
        email: "",
        password: "",
        confirmPassword: ""
      },
      show:false
    };
  },
  methods: {
    onSubmit(evt) {
      evt.preventDefault();
      sessionStorage.setItem("Password", this.form.password);
      sessionStorage.setItem("Username", this.form.username);
      sessionStorage.setItem("Email", this.form.email);
      if (this.form.password === this.form.confirmPassword) {
        AUTH.register(this.form.email, this.form.password);
      } else {
        console.log("Password didn't match");
      }
      // let link= `http://localhost:3000/db/update/${this.form.username}/${this.form.email}/${this.form.password}`
      // let link= `http://localhost:3000/db/delete`
      // let link= `http://localhost:3000/db/retrieve/${this.form.username}`
      let link = `http://localhost:3000/db/create/${this.form.username}/${this.form.email}/${this.form.password}`;
      $.ajax({
        url: link,
        method: "GET",
        headers: {
          "Access-Control-Allow-Origin": "*"
        }
      }).then(response => {
        alert(response.username);
      });
    }
  },
  handleOk(bvModalEvt) {
    // Prevent modal from closing
    bvModalEvt.preventDefault();
    // Trigger submit handler
    this.handleSubmit();
  }
};
</script>

<style scoped lang="scss">
@import "~assets/color.scss";
#modal{
  background-color:#BB6BD9;
}
#top {
  background-color: white;
  padding: 2vw 3vw 4vw;
  border-radius: 7px;
  box-shadow: 2px 5px 16px 2px rgba(16, 16, 16, 0.18);
  margin-top: 8%;
  margin-bottom: 3%;
  margin-left: 3%;
  margin-right: 3%;
}
.input {
  border-color: $motif;
}
#body {
  background-image: url("~assets/f.png");
  background-size: cover;
  background-attachment: fixed;
}
#login {
  background-color: $motif;
  width: 30%;
}
</style>