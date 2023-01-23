import React, { Component } from 'react';
import Login from './screens/Login/Login'
import Signup from './screens/Signup/Signup'
import QuizList from './screens/QuizList/QuizList'
import QuizInfo from './screens/QuizInfo/QuizInfo'
import StartQuiz from './screens/StartQuiz/StartQuiz'
import './App.css';

import 'typeface-roboto'

class App extends Component {
  constructor() {
    super()

    this.state = {
      quizzes: [

        
        {
          name: 'CSS',
          image: require("./images/css.jpg") ,
          description:'CSS stands for Cascading Style Sheets, It describes how HTML elements are to be displayed on screen, paper, or in other media.',
          subQuiz: [
            {
              name: 'Quiz 1', questions: '6', time: '30 sec', score: false,
              qArr: [
                {
                  question: "Css stands for?",
                  option1: "cascading style sheet'",
                  option2: "cascade sheet style",
                  option3: "color style sheet",
                  option4: "contrast style sheet",
                  answer: "1"
                },
                {
                  question: "to change the color we use",
                  option1: "color:",
                  option2: "setColor:",
                  option3: "color-style",
                  option4: "change-color",
                  answer: "1"
                },
                {
                  question: "How to link css?",
                  option1: "using link",
                  option2: "using button",
                  option3: "using javascript",
                  option4: "using img",
                  answer: "1"
                },
                {
                  question: "To change the color we use?",
                  option1: "color:",
                  option2: "setColor:",
                  option3: "color-style",
                  option4: "change-color",
                  answer: "1"
                },
                {
                  question: "How to link css?",
                  option1: "using link",
                  option2: "using button",
                  option3: "using javascript",
                  option4: "using img",
                  answer: "1"
                },
                {
                  question: "How to link css?",
                  option1: "using link",
                  option2: "using button",
                  option3: "using javascript",
                  option4: "using img",
                  answer: "1"
                },

              ]
            },
          ]
        },
       

      ],


      quizIndex: null,
      subQuizIndex: null,

      qstnNo: 0,

      validFlag: false,
      userFlag: true,

      userName: '',
      userEmail: '',
      userPass: '',
      loginEmail: '',
      loginPass: '',

      user: localStorage.getItem("user"),

    };

   

    this.updateText = this.updateText.bind(this)
    this.showSignup = this.showSignup.bind(this)
    this.showLogin = this.showLogin.bind(this)
    this.checkValidation = this.checkValidation.bind(this)

    this.joinQuiz = this.joinQuiz.bind(this);
    this.showList = this.showList.bind(this);
    this.startQuiz = this.startQuiz.bind(this);
    this.nextQstn = this.nextQstn.bind(this);
    this.back = this.back.bind(this);

    this.logout = this.logout.bind(this);
  }

  async updateText(e) {
    // console.log(e.target.name)
    // console.log(e.target.value)
    const name = e.target.name;
    const value = e.target.value;

    if (name.match('name')) {
      await this.setState({
        userName: value
      })
      localStorage.setItem('userName', this.state.userName)
    }
    else if (name.match('userEmail')) {
      await this.setState({
        userEmail: value
      })
      localStorage.setItem('userEmail', this.state.userEmail)
    }
    else if (name.match('userPassword')) {
      await this.setState({
        userPass: value
      })
      localStorage.setItem('userPass', this.state.userPass)
    }
    else if (name.match('loginEmail')) {
      await this.setState({
        loginEmail: value
      })
    }
    else if (name.match('loginPass')) {
      await this.setState({
        loginPass: value
      })
    }
  }

  showSignup() {
    this.setState({
      userFlag: false,
      loginEmail: '',
      loginPass: ''
    })
  }

  showLogin() {
    const {userEmail, userPass} = this.state;
    if(userEmail == ''  || userPass == ''){
    alert('Fill all the fields');
  }
  else{
    this.setState({
      userFlag: true,
      userEmail:'',
      userPass:'',
    })
  }
  }


  async checkValidation() {
    const { loginEmail, loginPass } = this.state
    if ((loginEmail.match(localStorage.getItem('userEmail'))) && (loginPass.match(localStorage.getItem('userPass')))) {
      await this.setState({
        validFlag: true,
        user: true,
      })
      localStorage.setItem('user', 'true')
    }
    console.log("Email is Valid :", this.state.validFlag)
  }


  logout() {
    this.setState({
      // quizIndex: null,
      // subQuizIndex: null,
      user: 'false',
      // userFlag: false,
      validFlag: false,
      loginEmail: '',
      loginPass: '',
      quiz: null,
      started: null,
      qstnNo: 0,
    })
    localStorage.setItem('user', 'false')
  }

  joinQuiz(quizIndex) {
    const { quizzes } = this.state;
    this.setState({
      quiz: quizzes[quizIndex],
      quizIndex: quizIndex,
      quizName: quizzes[quizIndex].name,
    });
  }

  showList() {
    this.setState({ quiz: null });
  }

  startQuiz(subQuizIndex) {
    const { quizzes, quizIndex } = this.state;

    this.setState({
      started: quizzes[quizIndex].subQuiz[subQuizIndex],
      subQuizIndex: subQuizIndex,
      subQuizName: quizzes[quizIndex].subQuiz[subQuizIndex].name,
    });
  }

  nextQstn(nextQstnNo) {

    this.setState({
      qstnNo: nextQstnNo + 1
    });
  }

  back() {
    this.setState({
      started: null,
      qstnNo: 0,
    });
  }


  render() {
    const { userFlag, validFlag, quizzes, quiz, started, qstnNo, quizName, subQuizName, user } = this.state;

    return (
      <center>
      <div>
        {(user === 'false' || user === null) && !userFlag && <Signup updateText={this.updateText} showLogin={this.showLogin} />}
        {(user === 'false' || user === null) && (userFlag && !validFlag) && <Login showSignup={this.showSignup} validation={this.checkValidation} updateText={this.updateText} />}
        {(user === 'true' || (userFlag && validFlag)) && (!quiz && !started) && <QuizList list={quizzes} onPress={this.joinQuiz} logout={this.logout} />}
        {(user === 'true' || (userFlag && validFlag)) && (quiz && !started) && <QuizInfo quiz={quiz} onPress={this.startQuiz} onBack={this.showList} logout={this.logout} />}
        {(user === 'true' || (userFlag && validFlag)) && started && <StartQuiz quizName={quizName} subQuizName={subQuizName} started={started} qstnNo={qstnNo} onPress={this.nextQstn} back={this.back} logout={this.logout} />}
      </div>
      </center>
    )
  }

}

export default App;