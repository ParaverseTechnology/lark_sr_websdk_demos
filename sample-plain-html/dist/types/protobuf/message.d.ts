import * as $protobuf from "protobufjs";
/** Namespace pxyproto. */
export namespace pxyproto {

    /** CONTROL_MSG_TYPE enum. */
    enum CONTROL_MSG_TYPE {
        MSG_HELLO = 0,
        MSG_PING = 1,
        MSG_PONG = 2
    }

    /** Properties of a ControlMessage. */
    interface IControlMessage {

        /** ControlMessage type */
        type?: (pxyproto.CONTROL_MSG_TYPE|null);
    }

    /** Represents a ControlMessage. */
    class ControlMessage implements IControlMessage {

        /**
         * Constructs a new ControlMessage.
         * @param [properties] Properties to set
         */
        constructor(properties?: pxyproto.IControlMessage);

        /** ControlMessage type. */
        public type: pxyproto.CONTROL_MSG_TYPE;

        /**
         * Creates a new ControlMessage instance using the specified properties.
         * @param [properties] Properties to set
         * @returns ControlMessage instance
         */
        public static create(properties?: pxyproto.IControlMessage): pxyproto.ControlMessage;

        /**
         * Encodes the specified ControlMessage message. Does not implicitly {@link pxyproto.ControlMessage.verify|verify} messages.
         * @param message ControlMessage message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: pxyproto.IControlMessage, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified ControlMessage message, length delimited. Does not implicitly {@link pxyproto.ControlMessage.verify|verify} messages.
         * @param message ControlMessage message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: pxyproto.IControlMessage, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a ControlMessage message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns ControlMessage
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): pxyproto.ControlMessage;

        /**
         * Decodes a ControlMessage message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns ControlMessage
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): pxyproto.ControlMessage;

        /**
         * Verifies a ControlMessage message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a ControlMessage message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns ControlMessage
         */
        public static fromObject(object: { [k: string]: any }): pxyproto.ControlMessage;

        /**
         * Creates a plain object from a ControlMessage message. Also converts values to other types if specified.
         * @param message ControlMessage
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: pxyproto.ControlMessage, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this ControlMessage to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** SystemType enum. */
    enum SystemType {
        WINDOWS = 0,
        MAC = 1,
        LINUX = 3,
        ANDROID = 4,
        IOS = 5
    }

    /** ClientType enum. */
    enum ClientType {
        WEB = 0,
        NATIVE = 1
    }

    /** PlatformType enum. */
    enum PlatformType {
        PC = 0,
        PHONE = 1,
        TABLET = 2
    }

    /** Properties of a ClientInfo. */
    interface IClientInfo {

        /** ClientInfo clientVersion */
        clientVersion?: (string|null);

        /** ClientInfo systemType */
        systemType?: (pxyproto.SystemType|null);

        /** ClientInfo clientType */
        clientType?: (pxyproto.ClientType|null);

        /** ClientInfo platformType */
        platformType?: (pxyproto.PlatformType|null);
    }

    /** Represents a ClientInfo. */
    class ClientInfo implements IClientInfo {

        /**
         * Constructs a new ClientInfo.
         * @param [properties] Properties to set
         */
        constructor(properties?: pxyproto.IClientInfo);

        /** ClientInfo clientVersion. */
        public clientVersion: string;

        /** ClientInfo systemType. */
        public systemType: pxyproto.SystemType;

        /** ClientInfo clientType. */
        public clientType: pxyproto.ClientType;

        /** ClientInfo platformType. */
        public platformType: pxyproto.PlatformType;

        /**
         * Creates a new ClientInfo instance using the specified properties.
         * @param [properties] Properties to set
         * @returns ClientInfo instance
         */
        public static create(properties?: pxyproto.IClientInfo): pxyproto.ClientInfo;

        /**
         * Encodes the specified ClientInfo message. Does not implicitly {@link pxyproto.ClientInfo.verify|verify} messages.
         * @param message ClientInfo message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: pxyproto.IClientInfo, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified ClientInfo message, length delimited. Does not implicitly {@link pxyproto.ClientInfo.verify|verify} messages.
         * @param message ClientInfo message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: pxyproto.IClientInfo, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a ClientInfo message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns ClientInfo
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): pxyproto.ClientInfo;

        /**
         * Decodes a ClientInfo message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns ClientInfo
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): pxyproto.ClientInfo;

        /**
         * Verifies a ClientInfo message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a ClientInfo message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns ClientInfo
         */
        public static fromObject(object: { [k: string]: any }): pxyproto.ClientInfo;

        /**
         * Creates a plain object from a ClientInfo message. Also converts values to other types if specified.
         * @param message ClientInfo
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: pxyproto.ClientInfo, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this ClientInfo to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a ViewPort. */
    interface IViewPort {

        /** ViewPort width */
        width?: (number|null);

        /** ViewPort height */
        height?: (number|null);
    }

    /** Represents a ViewPort. */
    class ViewPort implements IViewPort {

        /**
         * Constructs a new ViewPort.
         * @param [properties] Properties to set
         */
        constructor(properties?: pxyproto.IViewPort);

        /** ViewPort width. */
        public width: number;

        /** ViewPort height. */
        public height: number;

        /**
         * Creates a new ViewPort instance using the specified properties.
         * @param [properties] Properties to set
         * @returns ViewPort instance
         */
        public static create(properties?: pxyproto.IViewPort): pxyproto.ViewPort;

        /**
         * Encodes the specified ViewPort message. Does not implicitly {@link pxyproto.ViewPort.verify|verify} messages.
         * @param message ViewPort message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: pxyproto.IViewPort, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified ViewPort message, length delimited. Does not implicitly {@link pxyproto.ViewPort.verify|verify} messages.
         * @param message ViewPort message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: pxyproto.IViewPort, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a ViewPort message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns ViewPort
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): pxyproto.ViewPort;

        /**
         * Decodes a ViewPort message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns ViewPort
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): pxyproto.ViewPort;

        /**
         * Verifies a ViewPort message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a ViewPort message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns ViewPort
         */
        public static fromObject(object: { [k: string]: any }): pxyproto.ViewPort;

        /**
         * Creates a plain object from a ViewPort message. Also converts values to other types if specified.
         * @param message ViewPort
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: pxyproto.ViewPort, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this ViewPort to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a DataMessage. */
    interface IDataMessage {

        /** DataMessage data */
        data?: (Uint8Array|null);
    }

    /** Represents a DataMessage. */
    class DataMessage implements IDataMessage {

        /**
         * Constructs a new DataMessage.
         * @param [properties] Properties to set
         */
        constructor(properties?: pxyproto.IDataMessage);

        /** DataMessage data. */
        public data: Uint8Array;

        /**
         * Creates a new DataMessage instance using the specified properties.
         * @param [properties] Properties to set
         * @returns DataMessage instance
         */
        public static create(properties?: pxyproto.IDataMessage): pxyproto.DataMessage;

        /**
         * Encodes the specified DataMessage message. Does not implicitly {@link pxyproto.DataMessage.verify|verify} messages.
         * @param message DataMessage message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: pxyproto.IDataMessage, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified DataMessage message, length delimited. Does not implicitly {@link pxyproto.DataMessage.verify|verify} messages.
         * @param message DataMessage message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: pxyproto.IDataMessage, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a DataMessage message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns DataMessage
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): pxyproto.DataMessage;

        /**
         * Decodes a DataMessage message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns DataMessage
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): pxyproto.DataMessage;

        /**
         * Verifies a DataMessage message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a DataMessage message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns DataMessage
         */
        public static fromObject(object: { [k: string]: any }): pxyproto.DataMessage;

        /**
         * Creates a plain object from a DataMessage message. Also converts values to other types if specified.
         * @param message DataMessage
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: pxyproto.DataMessage, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this DataMessage to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a Message. */
    interface IMessage {

        /** Message controlMsg */
        controlMsg?: (pxyproto.IControlMessage|null);

        /** Message dataMsg */
        dataMsg?: (pxyproto.IDataMessage|null);

        /** Message clientInfo */
        clientInfo?: (pxyproto.IClientInfo|null);

        /** Message viewPort */
        viewPort?: (pxyproto.IViewPort|null);
    }

    /** Represents a Message. */
    class Message implements IMessage {

        /**
         * Constructs a new Message.
         * @param [properties] Properties to set
         */
        constructor(properties?: pxyproto.IMessage);

        /** Message controlMsg. */
        public controlMsg?: (pxyproto.IControlMessage|null);

        /** Message dataMsg. */
        public dataMsg?: (pxyproto.IDataMessage|null);

        /** Message clientInfo. */
        public clientInfo?: (pxyproto.IClientInfo|null);

        /** Message viewPort. */
        public viewPort?: (pxyproto.IViewPort|null);

        /** Message msg. */
        public msg?: ("controlMsg"|"dataMsg"|"clientInfo"|"viewPort");

        /**
         * Creates a new Message instance using the specified properties.
         * @param [properties] Properties to set
         * @returns Message instance
         */
        public static create(properties?: pxyproto.IMessage): pxyproto.Message;

        /**
         * Encodes the specified Message message. Does not implicitly {@link pxyproto.Message.verify|verify} messages.
         * @param message Message message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: pxyproto.IMessage, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified Message message, length delimited. Does not implicitly {@link pxyproto.Message.verify|verify} messages.
         * @param message Message message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: pxyproto.IMessage, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a Message message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns Message
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): pxyproto.Message;

        /**
         * Decodes a Message message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns Message
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): pxyproto.Message;

        /**
         * Verifies a Message message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a Message message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns Message
         */
        public static fromObject(object: { [k: string]: any }): pxyproto.Message;

        /**
         * Creates a plain object from a Message message. Also converts values to other types if specified.
         * @param message Message
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: pxyproto.Message, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this Message to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }
}
