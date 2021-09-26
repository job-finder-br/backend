type ExceptionProps = {
  message: string;
  statusCode: number;
};

class AppException {
  public readonly message: string;
  public readonly statusCode: number;

  constructor({ message, statusCode = 400 }: ExceptionProps) {
    this.message = message;
    this.statusCode = statusCode;
  }
}

export { AppException };
