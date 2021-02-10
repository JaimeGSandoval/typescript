// Closed to modifications means that once you've performed unit tests on the class and it passes you should effectively seal and avoid any modifications to it.
// New functionality should always be part of new class. You should always try to keep your code as dry as possible. So if the new functionality is somehow related to a closed class, instead of opening it to modification and adding stuff to it, you should consider using inheritance


// closed to modification
export class ErrorHandler {
  private messageBox: any;

  constructor(messageBox, httpClient) {
    this.messageBox = messageBox;
  }

  wrapError(err, publicResponse, severity) {
     let error = {
       originalError: err,
       publicResponse,
       severity
    }

    if(severity < 5) {
      this.handleWarning("Warning", publicResponse);
    } else {
      this.handleError("Critical error", publicResponse);
    }
  }

  private handleWarning(header, content) {
    this.messageBox.show(header, content);
  }

  private handleError(header, content) {
    this.messageBox.show(header, content);
  }
}

// Adding more functionality
export class ErrorLogger {
  private _endpoint: string = "api/log";

  constructor(private _httpClient) {

  }

  logError(errorObject): Promise<any> {
    return this._httpClient.post(this._endpoint, errorObject);
  }
}

export class ErrorHandlingWithLogging extends ErrorHandler {
   private _logger: ErrorLogger;

    constructor(messageBox, httpClient, logger: ErrorLogger) {
      super(messageBox, httpClient);
      this._logger = logger;
    }

    wrapError(err, publicResponse, severity) {
      return this._logger.logError(err).then(() => {
      super.wrapError(err, publicResponse, severity);
      });
    }
}
