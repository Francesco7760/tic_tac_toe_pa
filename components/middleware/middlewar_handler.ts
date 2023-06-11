import { MessagesEnum, getErrorMessage} from '../factory/message';

// show message 
export const errorHandler =  (Msg:MessagesEnum, req: any, res: any, next: any) => {
    const msg = getErrorMessage(Msg).getMessage();
    console.log(msg.code + ' : ' + msg.message);
    res.status(msg.code).json({Code: msg.code, Message: msg.code});
};