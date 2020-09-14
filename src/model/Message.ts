type Message = { kind: Message.Kind.Scan }

namespace Message {
    export const enum Kind {
        Scan,
    }
}

export default Message;
