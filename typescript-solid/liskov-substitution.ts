// A subclass should be used wherever its base class can be used. The program shouldn't have any type of undefined behavior just because the sub class defines a method or property in a different way than its bae/parent class

export class QuizQuestion {
  private _question: string;
  private _answer1: string;
  private _answer2: string;
  private _answer3: string;
  private _answer4: string;
  private _correctAnswer: number;

  constructor(question: string, ans1: string, ans2: string, ans3: string, ans4: string, correctAns: number) {
    this._question = question;
    this._answer1 = ans1;
    this._answer2 = ans2;
    this._answer3 = ans3;
    this._answer4 = ans4;
    this._correctAnswer = correctAns;
  }

  public get question(): string {
    return this._question;
  }

  public get answer1() {
    return this._answer1;
  }

   public get answer2() {
    return this._answer2;
  }

   public get answer3() {
    return this._answer3;
  }

   public get answer4() {
    return this._answer4;
  }

  public get correctAnswer(): number {
    return this._correctAnswer;
  }
}


// breaks lsp because the question format will come out differently. The solution is to not use inheritance by using extends and making a new class?
export class TrueFalseQuestion extends QuizQuestion {
  constructor(question) {
    super(question, "TRUE", "FALSE", null, null, 1);
  }
}

function formatQuestion(quizQuestion: QuizQuestion) {
  console.log(quizQuestion.question);
  console.log(`1. ${quizQuestion.answer1}`);
  console.log(`2. ${quizQuestion.answer2}`);
  console.log(`3. ${quizQuestion.answer3}`);
  console.log(`4. ${quizQuestion.answer4}`);
}

let quizQuestion = new QuizQuestion("Which framework is using TypeScript?", "React", "Vue", "Angular", "Cycle",  3);

let trueFalseQuestion = new TrueFalseQuestion("TypeScript is a super set of JavaScript")

formatQuestion(quizQuestion);
