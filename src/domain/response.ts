export class HttpResponse {
  private timeStamp: string;
  constructor(private statusCode: number,/* private httpStatus: string,*/ private message: string, private data?: {}) {
    this.timeStamp = new Date().toLocaleString();
    this.statusCode = statusCode;
    // this.httpStatus = httpStatus;
    this.message = message;
    this.data = data;
  }
}