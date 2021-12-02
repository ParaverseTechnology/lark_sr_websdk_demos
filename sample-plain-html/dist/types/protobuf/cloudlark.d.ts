import * as $protobuf from "protobufjs";
/** Namespace CloudLark. */
export namespace CloudLark {

    /** Properties of a Version. */
    interface IVersion {

        /** Version versionMarjor */
        versionMarjor?: (number|null);

        /** Version versionMinor */
        versionMinor?: (number|null);

        /** Version versionRevise */
        versionRevise?: (number|null);

        /** Version versionBuild */
        versionBuild?: (number|null);
    }

    /** Represents a Version. */
    class Version implements IVersion {

        /**
         * Constructs a new Version.
         * @param [properties] Properties to set
         */
        constructor(properties?: CloudLark.IVersion);

        /** Version versionMarjor. */
        public versionMarjor: number;

        /** Version versionMinor. */
        public versionMinor: number;

        /** Version versionRevise. */
        public versionRevise: number;

        /** Version versionBuild. */
        public versionBuild: number;

        /**
         * Creates a new Version instance using the specified properties.
         * @param [properties] Properties to set
         * @returns Version instance
         */
        public static create(properties?: CloudLark.IVersion): CloudLark.Version;

        /**
         * Encodes the specified Version message. Does not implicitly {@link CloudLark.Version.verify|verify} messages.
         * @param message Version message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: CloudLark.IVersion, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified Version message, length delimited. Does not implicitly {@link CloudLark.Version.verify|verify} messages.
         * @param message Version message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: CloudLark.IVersion, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a Version message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns Version
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): CloudLark.Version;

        /**
         * Decodes a Version message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns Version
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): CloudLark.Version;

        /**
         * Verifies a Version message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a Version message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns Version
         */
        public static fromObject(object: { [k: string]: any }): CloudLark.Version;

        /**
         * Creates a plain object from a Version message. Also converts values to other types if specified.
         * @param message Version
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: CloudLark.Version, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this Version to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a VersionCheck. */
    interface IVersionCheck {

        /** VersionCheck clientVer */
        clientVer?: (CloudLark.IVersion|null);
    }

    /** Represents a VersionCheck. */
    class VersionCheck implements IVersionCheck {

        /**
         * Constructs a new VersionCheck.
         * @param [properties] Properties to set
         */
        constructor(properties?: CloudLark.IVersionCheck);

        /** VersionCheck clientVer. */
        public clientVer?: (CloudLark.IVersion|null);

        /**
         * Creates a new VersionCheck instance using the specified properties.
         * @param [properties] Properties to set
         * @returns VersionCheck instance
         */
        public static create(properties?: CloudLark.IVersionCheck): CloudLark.VersionCheck;

        /**
         * Encodes the specified VersionCheck message. Does not implicitly {@link CloudLark.VersionCheck.verify|verify} messages.
         * @param message VersionCheck message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: CloudLark.IVersionCheck, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified VersionCheck message, length delimited. Does not implicitly {@link CloudLark.VersionCheck.verify|verify} messages.
         * @param message VersionCheck message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: CloudLark.IVersionCheck, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a VersionCheck message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns VersionCheck
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): CloudLark.VersionCheck;

        /**
         * Decodes a VersionCheck message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns VersionCheck
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): CloudLark.VersionCheck;

        /**
         * Verifies a VersionCheck message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a VersionCheck message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns VersionCheck
         */
        public static fromObject(object: { [k: string]: any }): CloudLark.VersionCheck;

        /**
         * Creates a plain object from a VersionCheck message. Also converts values to other types if specified.
         * @param message VersionCheck
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: CloudLark.VersionCheck, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this VersionCheck to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a VersionCheckResponse. */
    interface IVersionCheckResponse {

        /** VersionCheckResponse response */
        response?: (boolean|null);

        /** VersionCheckResponse serverVer */
        serverVer?: (CloudLark.IVersion|null);

        /** VersionCheckResponse clientVer */
        clientVer?: (CloudLark.IVersion|null);
    }

    /** Represents a VersionCheckResponse. */
    class VersionCheckResponse implements IVersionCheckResponse {

        /**
         * Constructs a new VersionCheckResponse.
         * @param [properties] Properties to set
         */
        constructor(properties?: CloudLark.IVersionCheckResponse);

        /** VersionCheckResponse response. */
        public response: boolean;

        /** VersionCheckResponse serverVer. */
        public serverVer?: (CloudLark.IVersion|null);

        /** VersionCheckResponse clientVer. */
        public clientVer?: (CloudLark.IVersion|null);

        /**
         * Creates a new VersionCheckResponse instance using the specified properties.
         * @param [properties] Properties to set
         * @returns VersionCheckResponse instance
         */
        public static create(properties?: CloudLark.IVersionCheckResponse): CloudLark.VersionCheckResponse;

        /**
         * Encodes the specified VersionCheckResponse message. Does not implicitly {@link CloudLark.VersionCheckResponse.verify|verify} messages.
         * @param message VersionCheckResponse message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: CloudLark.IVersionCheckResponse, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified VersionCheckResponse message, length delimited. Does not implicitly {@link CloudLark.VersionCheckResponse.verify|verify} messages.
         * @param message VersionCheckResponse message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: CloudLark.IVersionCheckResponse, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a VersionCheckResponse message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns VersionCheckResponse
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): CloudLark.VersionCheckResponse;

        /**
         * Decodes a VersionCheckResponse message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns VersionCheckResponse
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): CloudLark.VersionCheckResponse;

        /**
         * Verifies a VersionCheckResponse message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a VersionCheckResponse message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns VersionCheckResponse
         */
        public static fromObject(object: { [k: string]: any }): CloudLark.VersionCheckResponse;

        /**
         * Creates a plain object from a VersionCheckResponse message. Also converts values to other types if specified.
         * @param message VersionCheckResponse
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: CloudLark.VersionCheckResponse, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this VersionCheckResponse to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a TaskRequest. */
    interface ITaskRequest {

        /** TaskRequest taskid */
        taskid?: (string|null);

        /** TaskRequest type */
        type?: (CloudLark.TaskRequest.Type|null);

        /** TaskRequest nickname */
        nickname?: (string|null);
    }

    /** Represents a TaskRequest. */
    class TaskRequest implements ITaskRequest {

        /**
         * Constructs a new TaskRequest.
         * @param [properties] Properties to set
         */
        constructor(properties?: CloudLark.ITaskRequest);

        /** TaskRequest taskid. */
        public taskid: string;

        /** TaskRequest type. */
        public type: CloudLark.TaskRequest.Type;

        /** TaskRequest nickname. */
        public nickname: string;

        /**
         * Creates a new TaskRequest instance using the specified properties.
         * @param [properties] Properties to set
         * @returns TaskRequest instance
         */
        public static create(properties?: CloudLark.ITaskRequest): CloudLark.TaskRequest;

        /**
         * Encodes the specified TaskRequest message. Does not implicitly {@link CloudLark.TaskRequest.verify|verify} messages.
         * @param message TaskRequest message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: CloudLark.ITaskRequest, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified TaskRequest message, length delimited. Does not implicitly {@link CloudLark.TaskRequest.verify|verify} messages.
         * @param message TaskRequest message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: CloudLark.ITaskRequest, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a TaskRequest message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns TaskRequest
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): CloudLark.TaskRequest;

        /**
         * Decodes a TaskRequest message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns TaskRequest
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): CloudLark.TaskRequest;

        /**
         * Verifies a TaskRequest message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a TaskRequest message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns TaskRequest
         */
        public static fromObject(object: { [k: string]: any }): CloudLark.TaskRequest;

        /**
         * Creates a plain object from a TaskRequest message. Also converts values to other types if specified.
         * @param message TaskRequest
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: CloudLark.TaskRequest, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this TaskRequest to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    namespace TaskRequest {

        /** Type enum. */
        enum Type {
            PLAYER = 0,
            OB = 1
        }
    }

    /** TaskType enum. */
    enum TaskType {
        UNKNOWN = 0,
        DESKTOP = 1,
        SHARED = 2,
        VR = 3,
        XR = 4
    }

    /** Properties of a TaskResponse. */
    interface ITaskResponse {

        /** TaskResponse response */
        response?: (CloudLark.TaskResponse.Response|null);

        /** TaskResponse uid */
        uid?: (number|null);
    }

    /** Represents a TaskResponse. */
    class TaskResponse implements ITaskResponse {

        /**
         * Constructs a new TaskResponse.
         * @param [properties] Properties to set
         */
        constructor(properties?: CloudLark.ITaskResponse);

        /** TaskResponse response. */
        public response: CloudLark.TaskResponse.Response;

        /** TaskResponse uid. */
        public uid: number;

        /**
         * Creates a new TaskResponse instance using the specified properties.
         * @param [properties] Properties to set
         * @returns TaskResponse instance
         */
        public static create(properties?: CloudLark.ITaskResponse): CloudLark.TaskResponse;

        /**
         * Encodes the specified TaskResponse message. Does not implicitly {@link CloudLark.TaskResponse.verify|verify} messages.
         * @param message TaskResponse message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: CloudLark.ITaskResponse, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified TaskResponse message, length delimited. Does not implicitly {@link CloudLark.TaskResponse.verify|verify} messages.
         * @param message TaskResponse message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: CloudLark.ITaskResponse, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a TaskResponse message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns TaskResponse
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): CloudLark.TaskResponse;

        /**
         * Decodes a TaskResponse message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns TaskResponse
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): CloudLark.TaskResponse;

        /**
         * Verifies a TaskResponse message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a TaskResponse message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns TaskResponse
         */
        public static fromObject(object: { [k: string]: any }): CloudLark.TaskResponse;

        /**
         * Creates a plain object from a TaskResponse message. Also converts values to other types if specified.
         * @param message TaskResponse
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: CloudLark.TaskResponse, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this TaskResponse to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    namespace TaskResponse {

        /** Response enum. */
        enum Response {
            TASK_SUCCESS = 0,
            TASK_NOTFOUND = 1,
            TASK_SERVER_ERROR = 2,
            TASK_APP_WRONGPARAM = 3,
            TASK_NO_GPU_RESOURCE = 4
        }
    }

    /** Properties of a StartStreamRequest. */
    interface IStartStreamRequest {

        /** StartStreamRequest width */
        width?: (number|null);

        /** StartStreamRequest height */
        height?: (number|null);

        /** StartStreamRequest fps */
        fps?: (number|null);

        /** StartStreamRequest bitrateKbps */
        bitrateKbps?: (number|null);
    }

    /** Represents a StartStreamRequest. */
    class StartStreamRequest implements IStartStreamRequest {

        /**
         * Constructs a new StartStreamRequest.
         * @param [properties] Properties to set
         */
        constructor(properties?: CloudLark.IStartStreamRequest);

        /** StartStreamRequest width. */
        public width: number;

        /** StartStreamRequest height. */
        public height: number;

        /** StartStreamRequest fps. */
        public fps: number;

        /** StartStreamRequest bitrateKbps. */
        public bitrateKbps: number;

        /**
         * Creates a new StartStreamRequest instance using the specified properties.
         * @param [properties] Properties to set
         * @returns StartStreamRequest instance
         */
        public static create(properties?: CloudLark.IStartStreamRequest): CloudLark.StartStreamRequest;

        /**
         * Encodes the specified StartStreamRequest message. Does not implicitly {@link CloudLark.StartStreamRequest.verify|verify} messages.
         * @param message StartStreamRequest message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: CloudLark.IStartStreamRequest, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified StartStreamRequest message, length delimited. Does not implicitly {@link CloudLark.StartStreamRequest.verify|verify} messages.
         * @param message StartStreamRequest message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: CloudLark.IStartStreamRequest, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a StartStreamRequest message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns StartStreamRequest
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): CloudLark.StartStreamRequest;

        /**
         * Decodes a StartStreamRequest message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns StartStreamRequest
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): CloudLark.StartStreamRequest;

        /**
         * Verifies a StartStreamRequest message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a StartStreamRequest message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns StartStreamRequest
         */
        public static fromObject(object: { [k: string]: any }): CloudLark.StartStreamRequest;

        /**
         * Creates a plain object from a StartStreamRequest message. Also converts values to other types if specified.
         * @param message StartStreamRequest
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: CloudLark.StartStreamRequest, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this StartStreamRequest to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a StartVrStreamRequest. */
    interface IStartVrStreamRequest {

        /** StartVrStreamRequest width */
        width?: (number|null);

        /** StartVrStreamRequest height */
        height?: (number|null);

        /** StartVrStreamRequest fps */
        fps?: (number|null);

        /** StartVrStreamRequest bitrateKbps */
        bitrateKbps?: (number|null);

        /** StartVrStreamRequest ipd */
        ipd?: (number|null);

        /** StartVrStreamRequest roomSet */
        roomSet?: (number|null);

        /** StartVrStreamRequest fov */
        fov?: (number[]|null);

        /** StartVrStreamRequest hasTouchcontroller */
        hasTouchcontroller?: (boolean|null);

        /** StartVrStreamRequest useKcp */
        useKcp?: (boolean|null);

        /** StartVrStreamRequest useH265 */
        useH265?: (boolean|null);
    }

    /** Represents a StartVrStreamRequest. */
    class StartVrStreamRequest implements IStartVrStreamRequest {

        /**
         * Constructs a new StartVrStreamRequest.
         * @param [properties] Properties to set
         */
        constructor(properties?: CloudLark.IStartVrStreamRequest);

        /** StartVrStreamRequest width. */
        public width: number;

        /** StartVrStreamRequest height. */
        public height: number;

        /** StartVrStreamRequest fps. */
        public fps: number;

        /** StartVrStreamRequest bitrateKbps. */
        public bitrateKbps: number;

        /** StartVrStreamRequest ipd. */
        public ipd: number;

        /** StartVrStreamRequest roomSet. */
        public roomSet: number;

        /** StartVrStreamRequest fov. */
        public fov: number[];

        /** StartVrStreamRequest hasTouchcontroller. */
        public hasTouchcontroller: boolean;

        /** StartVrStreamRequest useKcp. */
        public useKcp: boolean;

        /** StartVrStreamRequest useH265. */
        public useH265: boolean;

        /**
         * Creates a new StartVrStreamRequest instance using the specified properties.
         * @param [properties] Properties to set
         * @returns StartVrStreamRequest instance
         */
        public static create(properties?: CloudLark.IStartVrStreamRequest): CloudLark.StartVrStreamRequest;

        /**
         * Encodes the specified StartVrStreamRequest message. Does not implicitly {@link CloudLark.StartVrStreamRequest.verify|verify} messages.
         * @param message StartVrStreamRequest message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: CloudLark.IStartVrStreamRequest, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified StartVrStreamRequest message, length delimited. Does not implicitly {@link CloudLark.StartVrStreamRequest.verify|verify} messages.
         * @param message StartVrStreamRequest message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: CloudLark.IStartVrStreamRequest, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a StartVrStreamRequest message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns StartVrStreamRequest
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): CloudLark.StartVrStreamRequest;

        /**
         * Decodes a StartVrStreamRequest message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns StartVrStreamRequest
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): CloudLark.StartVrStreamRequest;

        /**
         * Verifies a StartVrStreamRequest message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a StartVrStreamRequest message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns StartVrStreamRequest
         */
        public static fromObject(object: { [k: string]: any }): CloudLark.StartVrStreamRequest;

        /**
         * Creates a plain object from a StartVrStreamRequest message. Also converts values to other types if specified.
         * @param message StartVrStreamRequest
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: CloudLark.StartVrStreamRequest, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this StartVrStreamRequest to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a FoveatedRendering. */
    interface IFoveatedRendering {

        /** FoveatedRendering enableFoveateRendering */
        enableFoveateRendering?: (boolean|null);

        /** FoveatedRendering foveationStrength */
        foveationStrength?: (number|null);

        /** FoveatedRendering foveationShape */
        foveationShape?: (number|null);

        /** FoveatedRendering foveationVerticalOffset */
        foveationVerticalOffset?: (number|null);
    }

    /** Represents a FoveatedRendering. */
    class FoveatedRendering implements IFoveatedRendering {

        /**
         * Constructs a new FoveatedRendering.
         * @param [properties] Properties to set
         */
        constructor(properties?: CloudLark.IFoveatedRendering);

        /** FoveatedRendering enableFoveateRendering. */
        public enableFoveateRendering: boolean;

        /** FoveatedRendering foveationStrength. */
        public foveationStrength: number;

        /** FoveatedRendering foveationShape. */
        public foveationShape: number;

        /** FoveatedRendering foveationVerticalOffset. */
        public foveationVerticalOffset: number;

        /**
         * Creates a new FoveatedRendering instance using the specified properties.
         * @param [properties] Properties to set
         * @returns FoveatedRendering instance
         */
        public static create(properties?: CloudLark.IFoveatedRendering): CloudLark.FoveatedRendering;

        /**
         * Encodes the specified FoveatedRendering message. Does not implicitly {@link CloudLark.FoveatedRendering.verify|verify} messages.
         * @param message FoveatedRendering message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: CloudLark.IFoveatedRendering, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified FoveatedRendering message, length delimited. Does not implicitly {@link CloudLark.FoveatedRendering.verify|verify} messages.
         * @param message FoveatedRendering message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: CloudLark.IFoveatedRendering, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a FoveatedRendering message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns FoveatedRendering
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): CloudLark.FoveatedRendering;

        /**
         * Decodes a FoveatedRendering message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns FoveatedRendering
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): CloudLark.FoveatedRendering;

        /**
         * Verifies a FoveatedRendering message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a FoveatedRendering message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns FoveatedRendering
         */
        public static fromObject(object: { [k: string]: any }): CloudLark.FoveatedRendering;

        /**
         * Creates a plain object from a FoveatedRendering message. Also converts values to other types if specified.
         * @param message FoveatedRendering
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: CloudLark.FoveatedRendering, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this FoveatedRendering to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a ColorCorrention. */
    interface IColorCorrention {

        /** ColorCorrention enableColorCorrection */
        enableColorCorrection?: (boolean|null);

        /** ColorCorrention brightness */
        brightness?: (number|null);

        /** ColorCorrention contrast */
        contrast?: (number|null);

        /** ColorCorrention saturation */
        saturation?: (number|null);

        /** ColorCorrention gamma */
        gamma?: (number|null);

        /** ColorCorrention sharpening */
        sharpening?: (number|null);
    }

    /** Represents a ColorCorrention. */
    class ColorCorrention implements IColorCorrention {

        /**
         * Constructs a new ColorCorrention.
         * @param [properties] Properties to set
         */
        constructor(properties?: CloudLark.IColorCorrention);

        /** ColorCorrention enableColorCorrection. */
        public enableColorCorrection: boolean;

        /** ColorCorrention brightness. */
        public brightness: number;

        /** ColorCorrention contrast. */
        public contrast: number;

        /** ColorCorrention saturation. */
        public saturation: number;

        /** ColorCorrention gamma. */
        public gamma: number;

        /** ColorCorrention sharpening. */
        public sharpening: number;

        /**
         * Creates a new ColorCorrention instance using the specified properties.
         * @param [properties] Properties to set
         * @returns ColorCorrention instance
         */
        public static create(properties?: CloudLark.IColorCorrention): CloudLark.ColorCorrention;

        /**
         * Encodes the specified ColorCorrention message. Does not implicitly {@link CloudLark.ColorCorrention.verify|verify} messages.
         * @param message ColorCorrention message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: CloudLark.IColorCorrention, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified ColorCorrention message, length delimited. Does not implicitly {@link CloudLark.ColorCorrention.verify|verify} messages.
         * @param message ColorCorrention message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: CloudLark.IColorCorrention, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a ColorCorrention message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns ColorCorrention
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): CloudLark.ColorCorrention;

        /**
         * Decodes a ColorCorrention message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns ColorCorrention
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): CloudLark.ColorCorrention;

        /**
         * Verifies a ColorCorrention message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a ColorCorrention message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns ColorCorrention
         */
        public static fromObject(object: { [k: string]: any }): CloudLark.ColorCorrention;

        /**
         * Creates a plain object from a ColorCorrention message. Also converts values to other types if specified.
         * @param message ColorCorrention
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: CloudLark.ColorCorrention, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this ColorCorrention to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** StreamType enum. */
    enum StreamType {
        UDP = 0,
        TCP = 1,
        THROTTLED_UDP = 2,
        KCP = 3
    }

    /** Properties of a VideoDesc. */
    interface IVideoDesc {

        /** VideoDesc eyeResolutionWidth */
        eyeResolutionWidth?: (number|null);

        /** VideoDesc eyeResolutionHeight */
        eyeResolutionHeight?: (number|null);

        /** VideoDesc fps */
        fps?: (number|null);

        /** VideoDesc encodeBitrateMbs */
        encodeBitrateMbs?: (number|null);

        /** VideoDesc codec */
        codec?: (number|null);

        /** VideoDesc targetEyeResolutionWidth */
        targetEyeResolutionWidth?: (number|null);

        /** VideoDesc targetEyeResolutionHeight */
        targetEyeResolutionHeight?: (number|null);

        /** VideoDesc secondsFromVsyncToPhotons */
        secondsFromVsyncToPhotons?: (number|null);

        /** VideoDesc use10bitEncoder */
        use10bitEncoder?: (boolean|null);

        /** VideoDesc foveatedRendering */
        foveatedRendering?: (CloudLark.IFoveatedRendering|null);

        /** VideoDesc colorCorrention */
        colorCorrention?: (CloudLark.IColorCorrention|null);

        /** VideoDesc stream */
        stream?: (CloudLark.StreamType|null);
    }

    /** Represents a VideoDesc. */
    class VideoDesc implements IVideoDesc {

        /**
         * Constructs a new VideoDesc.
         * @param [properties] Properties to set
         */
        constructor(properties?: CloudLark.IVideoDesc);

        /** VideoDesc eyeResolutionWidth. */
        public eyeResolutionWidth: number;

        /** VideoDesc eyeResolutionHeight. */
        public eyeResolutionHeight: number;

        /** VideoDesc fps. */
        public fps: number;

        /** VideoDesc encodeBitrateMbs. */
        public encodeBitrateMbs: number;

        /** VideoDesc codec. */
        public codec: number;

        /** VideoDesc targetEyeResolutionWidth. */
        public targetEyeResolutionWidth: number;

        /** VideoDesc targetEyeResolutionHeight. */
        public targetEyeResolutionHeight: number;

        /** VideoDesc secondsFromVsyncToPhotons. */
        public secondsFromVsyncToPhotons: number;

        /** VideoDesc use10bitEncoder. */
        public use10bitEncoder: boolean;

        /** VideoDesc foveatedRendering. */
        public foveatedRendering?: (CloudLark.IFoveatedRendering|null);

        /** VideoDesc colorCorrention. */
        public colorCorrention?: (CloudLark.IColorCorrention|null);

        /** VideoDesc stream. */
        public stream: CloudLark.StreamType;

        /**
         * Creates a new VideoDesc instance using the specified properties.
         * @param [properties] Properties to set
         * @returns VideoDesc instance
         */
        public static create(properties?: CloudLark.IVideoDesc): CloudLark.VideoDesc;

        /**
         * Encodes the specified VideoDesc message. Does not implicitly {@link CloudLark.VideoDesc.verify|verify} messages.
         * @param message VideoDesc message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: CloudLark.IVideoDesc, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified VideoDesc message, length delimited. Does not implicitly {@link CloudLark.VideoDesc.verify|verify} messages.
         * @param message VideoDesc message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: CloudLark.IVideoDesc, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a VideoDesc message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns VideoDesc
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): CloudLark.VideoDesc;

        /**
         * Decodes a VideoDesc message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns VideoDesc
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): CloudLark.VideoDesc;

        /**
         * Verifies a VideoDesc message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a VideoDesc message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns VideoDesc
         */
        public static fromObject(object: { [k: string]: any }): CloudLark.VideoDesc;

        /**
         * Creates a plain object from a VideoDesc message. Also converts values to other types if specified.
         * @param message VideoDesc
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: CloudLark.VideoDesc, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this VideoDesc to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** HeadSetType enum. */
    enum HeadSetType {
        HTC = 0,
        OCULUS = 1,
        PICO2 = 2,
        PICO3 = 3,
        NOLO_Sonic_1 = 4
    }

    /** Properties of a HeadSetControllerDesc. */
    interface IHeadSetControllerDesc {

        /** HeadSetControllerDesc type */
        type?: (CloudLark.HeadSetType|null);

        /** HeadSetControllerDesc forece3dof */
        forece3dof?: (boolean|null);

        /** HeadSetControllerDesc controllerposeTimeOffset */
        controllerposeTimeOffset?: (number|null);

        /** HeadSetControllerDesc hapticsIntensity */
        hapticsIntensity?: (number|null);
    }

    /** Represents a HeadSetControllerDesc. */
    class HeadSetControllerDesc implements IHeadSetControllerDesc {

        /**
         * Constructs a new HeadSetControllerDesc.
         * @param [properties] Properties to set
         */
        constructor(properties?: CloudLark.IHeadSetControllerDesc);

        /** HeadSetControllerDesc type. */
        public type: CloudLark.HeadSetType;

        /** HeadSetControllerDesc forece3dof. */
        public forece3dof: boolean;

        /** HeadSetControllerDesc controllerposeTimeOffset. */
        public controllerposeTimeOffset: number;

        /** HeadSetControllerDesc hapticsIntensity. */
        public hapticsIntensity: number;

        /**
         * Creates a new HeadSetControllerDesc instance using the specified properties.
         * @param [properties] Properties to set
         * @returns HeadSetControllerDesc instance
         */
        public static create(properties?: CloudLark.IHeadSetControllerDesc): CloudLark.HeadSetControllerDesc;

        /**
         * Encodes the specified HeadSetControllerDesc message. Does not implicitly {@link CloudLark.HeadSetControllerDesc.verify|verify} messages.
         * @param message HeadSetControllerDesc message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: CloudLark.IHeadSetControllerDesc, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified HeadSetControllerDesc message, length delimited. Does not implicitly {@link CloudLark.HeadSetControllerDesc.verify|verify} messages.
         * @param message HeadSetControllerDesc message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: CloudLark.IHeadSetControllerDesc, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a HeadSetControllerDesc message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns HeadSetControllerDesc
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): CloudLark.HeadSetControllerDesc;

        /**
         * Decodes a HeadSetControllerDesc message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns HeadSetControllerDesc
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): CloudLark.HeadSetControllerDesc;

        /**
         * Verifies a HeadSetControllerDesc message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a HeadSetControllerDesc message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns HeadSetControllerDesc
         */
        public static fromObject(object: { [k: string]: any }): CloudLark.HeadSetControllerDesc;

        /**
         * Creates a plain object from a HeadSetControllerDesc message. Also converts values to other types if specified.
         * @param message HeadSetControllerDesc
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: CloudLark.HeadSetControllerDesc, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this HeadSetControllerDesc to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a StartNewVrStreamRequest. */
    interface IStartNewVrStreamRequest {

        /** StartNewVrStreamRequest videoDesc */
        videoDesc?: (CloudLark.IVideoDesc|null);

        /** StartNewVrStreamRequest headsetController */
        headsetController?: (CloudLark.IHeadSetControllerDesc|null);
    }

    /** Represents a StartNewVrStreamRequest. */
    class StartNewVrStreamRequest implements IStartNewVrStreamRequest {

        /**
         * Constructs a new StartNewVrStreamRequest.
         * @param [properties] Properties to set
         */
        constructor(properties?: CloudLark.IStartNewVrStreamRequest);

        /** StartNewVrStreamRequest videoDesc. */
        public videoDesc?: (CloudLark.IVideoDesc|null);

        /** StartNewVrStreamRequest headsetController. */
        public headsetController?: (CloudLark.IHeadSetControllerDesc|null);

        /**
         * Creates a new StartNewVrStreamRequest instance using the specified properties.
         * @param [properties] Properties to set
         * @returns StartNewVrStreamRequest instance
         */
        public static create(properties?: CloudLark.IStartNewVrStreamRequest): CloudLark.StartNewVrStreamRequest;

        /**
         * Encodes the specified StartNewVrStreamRequest message. Does not implicitly {@link CloudLark.StartNewVrStreamRequest.verify|verify} messages.
         * @param message StartNewVrStreamRequest message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: CloudLark.IStartNewVrStreamRequest, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified StartNewVrStreamRequest message, length delimited. Does not implicitly {@link CloudLark.StartNewVrStreamRequest.verify|verify} messages.
         * @param message StartNewVrStreamRequest message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: CloudLark.IStartNewVrStreamRequest, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a StartNewVrStreamRequest message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns StartNewVrStreamRequest
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): CloudLark.StartNewVrStreamRequest;

        /**
         * Decodes a StartNewVrStreamRequest message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns StartNewVrStreamRequest
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): CloudLark.StartNewVrStreamRequest;

        /**
         * Verifies a StartNewVrStreamRequest message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a StartNewVrStreamRequest message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns StartNewVrStreamRequest
         */
        public static fromObject(object: { [k: string]: any }): CloudLark.StartNewVrStreamRequest;

        /**
         * Creates a plain object from a StartNewVrStreamRequest message. Also converts values to other types if specified.
         * @param message StartNewVrStreamRequest
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: CloudLark.StartNewVrStreamRequest, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this StartNewVrStreamRequest to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a StartStreamResponse. */
    interface IStartStreamResponse {

        /** StartStreamResponse response */
        response?: (CloudLark.StartStreamResponse.Response|null);
    }

    /** Represents a StartStreamResponse. */
    class StartStreamResponse implements IStartStreamResponse {

        /**
         * Constructs a new StartStreamResponse.
         * @param [properties] Properties to set
         */
        constructor(properties?: CloudLark.IStartStreamResponse);

        /** StartStreamResponse response. */
        public response: CloudLark.StartStreamResponse.Response;

        /**
         * Creates a new StartStreamResponse instance using the specified properties.
         * @param [properties] Properties to set
         * @returns StartStreamResponse instance
         */
        public static create(properties?: CloudLark.IStartStreamResponse): CloudLark.StartStreamResponse;

        /**
         * Encodes the specified StartStreamResponse message. Does not implicitly {@link CloudLark.StartStreamResponse.verify|verify} messages.
         * @param message StartStreamResponse message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: CloudLark.IStartStreamResponse, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified StartStreamResponse message, length delimited. Does not implicitly {@link CloudLark.StartStreamResponse.verify|verify} messages.
         * @param message StartStreamResponse message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: CloudLark.IStartStreamResponse, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a StartStreamResponse message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns StartStreamResponse
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): CloudLark.StartStreamResponse;

        /**
         * Decodes a StartStreamResponse message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns StartStreamResponse
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): CloudLark.StartStreamResponse;

        /**
         * Verifies a StartStreamResponse message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a StartStreamResponse message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns StartStreamResponse
         */
        public static fromObject(object: { [k: string]: any }): CloudLark.StartStreamResponse;

        /**
         * Creates a plain object from a StartStreamResponse message. Also converts values to other types if specified.
         * @param message StartStreamResponse
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: CloudLark.StartStreamResponse, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this StartStreamResponse to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    namespace StartStreamResponse {

        /** Response enum. */
        enum Response {
            START_SUCCESS = 0,
            START_STREAM_PROCESS_START_FAILED = 1,
            START_STREAM_PROCESS_START_TIMEOUT = 2,
            START_STREAM_NOT_STREAMING = 3,
            START_STREAM_ENCODER_ERROR = 4
        }
    }

    /** Properties of a StartVrStreamResponse. */
    interface IStartVrStreamResponse {

        /** StartVrStreamResponse response */
        response?: (CloudLark.StartVrStreamResponse.Response|null);

        /** StartVrStreamResponse port */
        port?: (number|null);
    }

    /** Represents a StartVrStreamResponse. */
    class StartVrStreamResponse implements IStartVrStreamResponse {

        /**
         * Constructs a new StartVrStreamResponse.
         * @param [properties] Properties to set
         */
        constructor(properties?: CloudLark.IStartVrStreamResponse);

        /** StartVrStreamResponse response. */
        public response: CloudLark.StartVrStreamResponse.Response;

        /** StartVrStreamResponse port. */
        public port: number;

        /**
         * Creates a new StartVrStreamResponse instance using the specified properties.
         * @param [properties] Properties to set
         * @returns StartVrStreamResponse instance
         */
        public static create(properties?: CloudLark.IStartVrStreamResponse): CloudLark.StartVrStreamResponse;

        /**
         * Encodes the specified StartVrStreamResponse message. Does not implicitly {@link CloudLark.StartVrStreamResponse.verify|verify} messages.
         * @param message StartVrStreamResponse message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: CloudLark.IStartVrStreamResponse, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified StartVrStreamResponse message, length delimited. Does not implicitly {@link CloudLark.StartVrStreamResponse.verify|verify} messages.
         * @param message StartVrStreamResponse message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: CloudLark.IStartVrStreamResponse, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a StartVrStreamResponse message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns StartVrStreamResponse
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): CloudLark.StartVrStreamResponse;

        /**
         * Decodes a StartVrStreamResponse message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns StartVrStreamResponse
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): CloudLark.StartVrStreamResponse;

        /**
         * Verifies a StartVrStreamResponse message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a StartVrStreamResponse message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns StartVrStreamResponse
         */
        public static fromObject(object: { [k: string]: any }): CloudLark.StartVrStreamResponse;

        /**
         * Creates a plain object from a StartVrStreamResponse message. Also converts values to other types if specified.
         * @param message StartVrStreamResponse
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: CloudLark.StartVrStreamResponse, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this StartVrStreamResponse to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    namespace StartVrStreamResponse {

        /** Response enum. */
        enum Response {
            START_SUCCESS = 0,
            START_PROCESS_FAILED = 1,
            START_DRIVER_RUNTIME_TIMEOUT = 2,
            START_DRIVER_RUNTIME_UDPPORT_ERROR = 3,
            START_DRIVER_RUNTIME_ENCODER_ERROR = 4
        }
    }

    /** Properties of a WebrtcOfferAnswer. */
    interface IWebrtcOfferAnswer {

        /** WebrtcOfferAnswer type */
        type?: (string|null);

        /** WebrtcOfferAnswer sdp */
        sdp?: (string|null);
    }

    /** Represents a WebrtcOfferAnswer. */
    class WebrtcOfferAnswer implements IWebrtcOfferAnswer {

        /**
         * Constructs a new WebrtcOfferAnswer.
         * @param [properties] Properties to set
         */
        constructor(properties?: CloudLark.IWebrtcOfferAnswer);

        /** WebrtcOfferAnswer type. */
        public type: string;

        /** WebrtcOfferAnswer sdp. */
        public sdp: string;

        /**
         * Creates a new WebrtcOfferAnswer instance using the specified properties.
         * @param [properties] Properties to set
         * @returns WebrtcOfferAnswer instance
         */
        public static create(properties?: CloudLark.IWebrtcOfferAnswer): CloudLark.WebrtcOfferAnswer;

        /**
         * Encodes the specified WebrtcOfferAnswer message. Does not implicitly {@link CloudLark.WebrtcOfferAnswer.verify|verify} messages.
         * @param message WebrtcOfferAnswer message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: CloudLark.IWebrtcOfferAnswer, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified WebrtcOfferAnswer message, length delimited. Does not implicitly {@link CloudLark.WebrtcOfferAnswer.verify|verify} messages.
         * @param message WebrtcOfferAnswer message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: CloudLark.IWebrtcOfferAnswer, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a WebrtcOfferAnswer message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns WebrtcOfferAnswer
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): CloudLark.WebrtcOfferAnswer;

        /**
         * Decodes a WebrtcOfferAnswer message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns WebrtcOfferAnswer
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): CloudLark.WebrtcOfferAnswer;

        /**
         * Verifies a WebrtcOfferAnswer message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a WebrtcOfferAnswer message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns WebrtcOfferAnswer
         */
        public static fromObject(object: { [k: string]: any }): CloudLark.WebrtcOfferAnswer;

        /**
         * Creates a plain object from a WebrtcOfferAnswer message. Also converts values to other types if specified.
         * @param message WebrtcOfferAnswer
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: CloudLark.WebrtcOfferAnswer, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this WebrtcOfferAnswer to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a WebrtcIceCandidate. */
    interface IWebrtcIceCandidate {

        /** WebrtcIceCandidate sdpmid */
        sdpmid?: (string|null);

        /** WebrtcIceCandidate sdpMlineindex */
        sdpMlineindex?: (number|null);

        /** WebrtcIceCandidate candidate */
        candidate?: (string|null);
    }

    /** Represents a WebrtcIceCandidate. */
    class WebrtcIceCandidate implements IWebrtcIceCandidate {

        /**
         * Constructs a new WebrtcIceCandidate.
         * @param [properties] Properties to set
         */
        constructor(properties?: CloudLark.IWebrtcIceCandidate);

        /** WebrtcIceCandidate sdpmid. */
        public sdpmid: string;

        /** WebrtcIceCandidate sdpMlineindex. */
        public sdpMlineindex: number;

        /** WebrtcIceCandidate candidate. */
        public candidate: string;

        /**
         * Creates a new WebrtcIceCandidate instance using the specified properties.
         * @param [properties] Properties to set
         * @returns WebrtcIceCandidate instance
         */
        public static create(properties?: CloudLark.IWebrtcIceCandidate): CloudLark.WebrtcIceCandidate;

        /**
         * Encodes the specified WebrtcIceCandidate message. Does not implicitly {@link CloudLark.WebrtcIceCandidate.verify|verify} messages.
         * @param message WebrtcIceCandidate message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: CloudLark.IWebrtcIceCandidate, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified WebrtcIceCandidate message, length delimited. Does not implicitly {@link CloudLark.WebrtcIceCandidate.verify|verify} messages.
         * @param message WebrtcIceCandidate message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: CloudLark.IWebrtcIceCandidate, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a WebrtcIceCandidate message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns WebrtcIceCandidate
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): CloudLark.WebrtcIceCandidate;

        /**
         * Decodes a WebrtcIceCandidate message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns WebrtcIceCandidate
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): CloudLark.WebrtcIceCandidate;

        /**
         * Verifies a WebrtcIceCandidate message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a WebrtcIceCandidate message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns WebrtcIceCandidate
         */
        public static fromObject(object: { [k: string]: any }): CloudLark.WebrtcIceCandidate;

        /**
         * Creates a plain object from a WebrtcIceCandidate message. Also converts values to other types if specified.
         * @param message WebrtcIceCandidate
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: CloudLark.WebrtcIceCandidate, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this WebrtcIceCandidate to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a WebrtcError. */
    interface IWebrtcError {
    }

    /** Represents a WebrtcError. */
    class WebrtcError implements IWebrtcError {

        /**
         * Constructs a new WebrtcError.
         * @param [properties] Properties to set
         */
        constructor(properties?: CloudLark.IWebrtcError);

        /**
         * Creates a new WebrtcError instance using the specified properties.
         * @param [properties] Properties to set
         * @returns WebrtcError instance
         */
        public static create(properties?: CloudLark.IWebrtcError): CloudLark.WebrtcError;

        /**
         * Encodes the specified WebrtcError message. Does not implicitly {@link CloudLark.WebrtcError.verify|verify} messages.
         * @param message WebrtcError message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: CloudLark.IWebrtcError, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified WebrtcError message, length delimited. Does not implicitly {@link CloudLark.WebrtcError.verify|verify} messages.
         * @param message WebrtcError message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: CloudLark.IWebrtcError, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a WebrtcError message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns WebrtcError
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): CloudLark.WebrtcError;

        /**
         * Decodes a WebrtcError message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns WebrtcError
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): CloudLark.WebrtcError;

        /**
         * Verifies a WebrtcError message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a WebrtcError message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns WebrtcError
         */
        public static fromObject(object: { [k: string]: any }): CloudLark.WebrtcError;

        /**
         * Creates a plain object from a WebrtcError message. Also converts values to other types if specified.
         * @param message WebrtcError
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: CloudLark.WebrtcError, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this WebrtcError to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of an AppProcessControl. */
    interface IAppProcessControl {

        /** AppProcessControl request */
        request?: (CloudLark.AppProcessControl.Type|null);
    }

    /** Represents an AppProcessControl. */
    class AppProcessControl implements IAppProcessControl {

        /**
         * Constructs a new AppProcessControl.
         * @param [properties] Properties to set
         */
        constructor(properties?: CloudLark.IAppProcessControl);

        /** AppProcessControl request. */
        public request: CloudLark.AppProcessControl.Type;

        /**
         * Creates a new AppProcessControl instance using the specified properties.
         * @param [properties] Properties to set
         * @returns AppProcessControl instance
         */
        public static create(properties?: CloudLark.IAppProcessControl): CloudLark.AppProcessControl;

        /**
         * Encodes the specified AppProcessControl message. Does not implicitly {@link CloudLark.AppProcessControl.verify|verify} messages.
         * @param message AppProcessControl message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: CloudLark.IAppProcessControl, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified AppProcessControl message, length delimited. Does not implicitly {@link CloudLark.AppProcessControl.verify|verify} messages.
         * @param message AppProcessControl message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: CloudLark.IAppProcessControl, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes an AppProcessControl message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns AppProcessControl
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): CloudLark.AppProcessControl;

        /**
         * Decodes an AppProcessControl message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns AppProcessControl
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): CloudLark.AppProcessControl;

        /**
         * Verifies an AppProcessControl message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates an AppProcessControl message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns AppProcessControl
         */
        public static fromObject(object: { [k: string]: any }): CloudLark.AppProcessControl;

        /**
         * Creates a plain object from an AppProcessControl message. Also converts values to other types if specified.
         * @param message AppProcessControl
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: CloudLark.AppProcessControl, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this AppProcessControl to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    namespace AppProcessControl {

        /** Type enum. */
        enum Type {
            ProcessRestart = 0
        }
    }

    /** Properties of an AppQuit. */
    interface IAppQuit {

        /** AppQuit reStartStream */
        reStartStream?: (boolean|null);
    }

    /** Represents an AppQuit. */
    class AppQuit implements IAppQuit {

        /**
         * Constructs a new AppQuit.
         * @param [properties] Properties to set
         */
        constructor(properties?: CloudLark.IAppQuit);

        /** AppQuit reStartStream. */
        public reStartStream: boolean;

        /**
         * Creates a new AppQuit instance using the specified properties.
         * @param [properties] Properties to set
         * @returns AppQuit instance
         */
        public static create(properties?: CloudLark.IAppQuit): CloudLark.AppQuit;

        /**
         * Encodes the specified AppQuit message. Does not implicitly {@link CloudLark.AppQuit.verify|verify} messages.
         * @param message AppQuit message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: CloudLark.IAppQuit, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified AppQuit message, length delimited. Does not implicitly {@link CloudLark.AppQuit.verify|verify} messages.
         * @param message AppQuit message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: CloudLark.IAppQuit, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes an AppQuit message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns AppQuit
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): CloudLark.AppQuit;

        /**
         * Decodes an AppQuit message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns AppQuit
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): CloudLark.AppQuit;

        /**
         * Verifies an AppQuit message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates an AppQuit message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns AppQuit
         */
        public static fromObject(object: { [k: string]: any }): CloudLark.AppQuit;

        /**
         * Creates a plain object from an AppQuit message. Also converts values to other types if specified.
         * @param message AppQuit
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: CloudLark.AppQuit, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this AppQuit to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of an AppProcessNotification. */
    interface IAppProcessNotification {

        /** AppProcessNotification appQuit */
        appQuit?: (CloudLark.IAppQuit|null);
    }

    /** Represents an AppProcessNotification. */
    class AppProcessNotification implements IAppProcessNotification {

        /**
         * Constructs a new AppProcessNotification.
         * @param [properties] Properties to set
         */
        constructor(properties?: CloudLark.IAppProcessNotification);

        /** AppProcessNotification appQuit. */
        public appQuit?: (CloudLark.IAppQuit|null);

        /** AppProcessNotification AppNotify. */
        public AppNotify?: "appQuit";

        /**
         * Creates a new AppProcessNotification instance using the specified properties.
         * @param [properties] Properties to set
         * @returns AppProcessNotification instance
         */
        public static create(properties?: CloudLark.IAppProcessNotification): CloudLark.AppProcessNotification;

        /**
         * Encodes the specified AppProcessNotification message. Does not implicitly {@link CloudLark.AppProcessNotification.verify|verify} messages.
         * @param message AppProcessNotification message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: CloudLark.IAppProcessNotification, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified AppProcessNotification message, length delimited. Does not implicitly {@link CloudLark.AppProcessNotification.verify|verify} messages.
         * @param message AppProcessNotification message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: CloudLark.IAppProcessNotification, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes an AppProcessNotification message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns AppProcessNotification
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): CloudLark.AppProcessNotification;

        /**
         * Decodes an AppProcessNotification message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns AppProcessNotification
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): CloudLark.AppProcessNotification;

        /**
         * Verifies an AppProcessNotification message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates an AppProcessNotification message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns AppProcessNotification
         */
        public static fromObject(object: { [k: string]: any }): CloudLark.AppProcessNotification;

        /**
         * Creates a plain object from an AppProcessNotification message. Also converts values to other types if specified.
         * @param message AppProcessNotification
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: CloudLark.AppProcessNotification, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this AppProcessNotification to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a NotifyClientLogout. */
    interface INotifyClientLogout {

        /** NotifyClientLogout logoutType */
        logoutType?: (CloudLark.NotifyClientLogout.Type|null);
    }

    /** Represents a NotifyClientLogout. */
    class NotifyClientLogout implements INotifyClientLogout {

        /**
         * Constructs a new NotifyClientLogout.
         * @param [properties] Properties to set
         */
        constructor(properties?: CloudLark.INotifyClientLogout);

        /** NotifyClientLogout logoutType. */
        public logoutType: CloudLark.NotifyClientLogout.Type;

        /**
         * Creates a new NotifyClientLogout instance using the specified properties.
         * @param [properties] Properties to set
         * @returns NotifyClientLogout instance
         */
        public static create(properties?: CloudLark.INotifyClientLogout): CloudLark.NotifyClientLogout;

        /**
         * Encodes the specified NotifyClientLogout message. Does not implicitly {@link CloudLark.NotifyClientLogout.verify|verify} messages.
         * @param message NotifyClientLogout message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: CloudLark.INotifyClientLogout, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified NotifyClientLogout message, length delimited. Does not implicitly {@link CloudLark.NotifyClientLogout.verify|verify} messages.
         * @param message NotifyClientLogout message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: CloudLark.INotifyClientLogout, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a NotifyClientLogout message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns NotifyClientLogout
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): CloudLark.NotifyClientLogout;

        /**
         * Decodes a NotifyClientLogout message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns NotifyClientLogout
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): CloudLark.NotifyClientLogout;

        /**
         * Verifies a NotifyClientLogout message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a NotifyClientLogout message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns NotifyClientLogout
         */
        public static fromObject(object: { [k: string]: any }): CloudLark.NotifyClientLogout;

        /**
         * Creates a plain object from a NotifyClientLogout message. Also converts values to other types if specified.
         * @param message NotifyClientLogout
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: CloudLark.NotifyClientLogout, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this NotifyClientLogout to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    namespace NotifyClientLogout {

        /** Type enum. */
        enum Type {
            PLAYER_LOGOUT = 0
        }
    }

    /** Properties of a VrMonitorRequest. */
    interface IVrMonitorRequest {

        /** VrMonitorRequest taskid */
        taskid?: (string|null);

        /** VrMonitorRequest width */
        width?: (number|null);

        /** VrMonitorRequest height */
        height?: (number|null);

        /** VrMonitorRequest fps */
        fps?: (number|null);

        /** VrMonitorRequest bitrateKbps */
        bitrateKbps?: (number|null);
    }

    /** Represents a VrMonitorRequest. */
    class VrMonitorRequest implements IVrMonitorRequest {

        /**
         * Constructs a new VrMonitorRequest.
         * @param [properties] Properties to set
         */
        constructor(properties?: CloudLark.IVrMonitorRequest);

        /** VrMonitorRequest taskid. */
        public taskid: string;

        /** VrMonitorRequest width. */
        public width: number;

        /** VrMonitorRequest height. */
        public height: number;

        /** VrMonitorRequest fps. */
        public fps: number;

        /** VrMonitorRequest bitrateKbps. */
        public bitrateKbps: number;

        /**
         * Creates a new VrMonitorRequest instance using the specified properties.
         * @param [properties] Properties to set
         * @returns VrMonitorRequest instance
         */
        public static create(properties?: CloudLark.IVrMonitorRequest): CloudLark.VrMonitorRequest;

        /**
         * Encodes the specified VrMonitorRequest message. Does not implicitly {@link CloudLark.VrMonitorRequest.verify|verify} messages.
         * @param message VrMonitorRequest message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: CloudLark.IVrMonitorRequest, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified VrMonitorRequest message, length delimited. Does not implicitly {@link CloudLark.VrMonitorRequest.verify|verify} messages.
         * @param message VrMonitorRequest message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: CloudLark.IVrMonitorRequest, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a VrMonitorRequest message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns VrMonitorRequest
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): CloudLark.VrMonitorRequest;

        /**
         * Decodes a VrMonitorRequest message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns VrMonitorRequest
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): CloudLark.VrMonitorRequest;

        /**
         * Verifies a VrMonitorRequest message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a VrMonitorRequest message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns VrMonitorRequest
         */
        public static fromObject(object: { [k: string]: any }): CloudLark.VrMonitorRequest;

        /**
         * Creates a plain object from a VrMonitorRequest message. Also converts values to other types if specified.
         * @param message VrMonitorRequest
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: CloudLark.VrMonitorRequest, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this VrMonitorRequest to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a VrMonitorResponse. */
    interface IVrMonitorResponse {

        /** VrMonitorResponse response */
        response?: (CloudLark.VrMonitorResponse.Response|null);
    }

    /** Represents a VrMonitorResponse. */
    class VrMonitorResponse implements IVrMonitorResponse {

        /**
         * Constructs a new VrMonitorResponse.
         * @param [properties] Properties to set
         */
        constructor(properties?: CloudLark.IVrMonitorResponse);

        /** VrMonitorResponse response. */
        public response: CloudLark.VrMonitorResponse.Response;

        /**
         * Creates a new VrMonitorResponse instance using the specified properties.
         * @param [properties] Properties to set
         * @returns VrMonitorResponse instance
         */
        public static create(properties?: CloudLark.IVrMonitorResponse): CloudLark.VrMonitorResponse;

        /**
         * Encodes the specified VrMonitorResponse message. Does not implicitly {@link CloudLark.VrMonitorResponse.verify|verify} messages.
         * @param message VrMonitorResponse message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: CloudLark.IVrMonitorResponse, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified VrMonitorResponse message, length delimited. Does not implicitly {@link CloudLark.VrMonitorResponse.verify|verify} messages.
         * @param message VrMonitorResponse message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: CloudLark.IVrMonitorResponse, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a VrMonitorResponse message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns VrMonitorResponse
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): CloudLark.VrMonitorResponse;

        /**
         * Decodes a VrMonitorResponse message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns VrMonitorResponse
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): CloudLark.VrMonitorResponse;

        /**
         * Verifies a VrMonitorResponse message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a VrMonitorResponse message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns VrMonitorResponse
         */
        public static fromObject(object: { [k: string]: any }): CloudLark.VrMonitorResponse;

        /**
         * Creates a plain object from a VrMonitorResponse message. Also converts values to other types if specified.
         * @param message VrMonitorResponse
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: CloudLark.VrMonitorResponse, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this VrMonitorResponse to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    namespace VrMonitorResponse {

        /** Response enum. */
        enum Response {
            MONITOR_SUCCESS = 0,
            MONITOR_ERROR_TASKNOTFOUND = 1,
            MONITOR_ERROR_TASKNOTSTREAMING = 2
        }
    }

    /** Properties of a ToServerMessage. */
    interface IToServerMessage {

        /** ToServerMessage magic */
        magic?: (number|null);

        /** ToServerMessage versionCheckRequest */
        versionCheckRequest?: (CloudLark.IVersionCheck|null);

        /** ToServerMessage taskRequest */
        taskRequest?: (CloudLark.ITaskRequest|null);

        /** ToServerMessage startStreamRequest */
        startStreamRequest?: (CloudLark.IStartStreamRequest|null);

        /** ToServerMessage webrtcOfferAnswer */
        webrtcOfferAnswer?: (CloudLark.IWebrtcOfferAnswer|null);

        /** ToServerMessage webrtcIcecandidate */
        webrtcIcecandidate?: (CloudLark.IWebrtcIceCandidate|null);

        /** ToServerMessage processControl */
        processControl?: (CloudLark.IAppProcessControl|null);

        /** ToServerMessage startVrsteamRequest */
        startVrsteamRequest?: (CloudLark.IStartVrStreamRequest|null);

        /** ToServerMessage vrMonitorRequest */
        vrMonitorRequest?: (CloudLark.IVrMonitorRequest|null);

        /** ToServerMessage startNewVrstreamRequest */
        startNewVrstreamRequest?: (CloudLark.IStartNewVrStreamRequest|null);
    }

    /** Represents a ToServerMessage. */
    class ToServerMessage implements IToServerMessage {

        /**
         * Constructs a new ToServerMessage.
         * @param [properties] Properties to set
         */
        constructor(properties?: CloudLark.IToServerMessage);

        /** ToServerMessage magic. */
        public magic: number;

        /** ToServerMessage versionCheckRequest. */
        public versionCheckRequest?: (CloudLark.IVersionCheck|null);

        /** ToServerMessage taskRequest. */
        public taskRequest?: (CloudLark.ITaskRequest|null);

        /** ToServerMessage startStreamRequest. */
        public startStreamRequest?: (CloudLark.IStartStreamRequest|null);

        /** ToServerMessage webrtcOfferAnswer. */
        public webrtcOfferAnswer?: (CloudLark.IWebrtcOfferAnswer|null);

        /** ToServerMessage webrtcIcecandidate. */
        public webrtcIcecandidate?: (CloudLark.IWebrtcIceCandidate|null);

        /** ToServerMessage processControl. */
        public processControl?: (CloudLark.IAppProcessControl|null);

        /** ToServerMessage startVrsteamRequest. */
        public startVrsteamRequest?: (CloudLark.IStartVrStreamRequest|null);

        /** ToServerMessage vrMonitorRequest. */
        public vrMonitorRequest?: (CloudLark.IVrMonitorRequest|null);

        /** ToServerMessage startNewVrstreamRequest. */
        public startNewVrstreamRequest?: (CloudLark.IStartNewVrStreamRequest|null);

        /** ToServerMessage msg. */
        public msg?: ("versionCheckRequest"|"taskRequest"|"startStreamRequest"|"webrtcOfferAnswer"|"webrtcIcecandidate"|"processControl"|"startVrsteamRequest"|"vrMonitorRequest"|"startNewVrstreamRequest");

        /**
         * Creates a new ToServerMessage instance using the specified properties.
         * @param [properties] Properties to set
         * @returns ToServerMessage instance
         */
        public static create(properties?: CloudLark.IToServerMessage): CloudLark.ToServerMessage;

        /**
         * Encodes the specified ToServerMessage message. Does not implicitly {@link CloudLark.ToServerMessage.verify|verify} messages.
         * @param message ToServerMessage message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: CloudLark.IToServerMessage, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified ToServerMessage message, length delimited. Does not implicitly {@link CloudLark.ToServerMessage.verify|verify} messages.
         * @param message ToServerMessage message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: CloudLark.IToServerMessage, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a ToServerMessage message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns ToServerMessage
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): CloudLark.ToServerMessage;

        /**
         * Decodes a ToServerMessage message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns ToServerMessage
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): CloudLark.ToServerMessage;

        /**
         * Verifies a ToServerMessage message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a ToServerMessage message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns ToServerMessage
         */
        public static fromObject(object: { [k: string]: any }): CloudLark.ToServerMessage;

        /**
         * Creates a plain object from a ToServerMessage message. Also converts values to other types if specified.
         * @param message ToServerMessage
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: CloudLark.ToServerMessage, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this ToServerMessage to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a ToClientMessage. */
    interface IToClientMessage {

        /** ToClientMessage magic */
        magic?: (number|null);

        /** ToClientMessage versionCheckResponse */
        versionCheckResponse?: (CloudLark.IVersionCheckResponse|null);

        /** ToClientMessage taskResponse */
        taskResponse?: (CloudLark.ITaskResponse|null);

        /** ToClientMessage startStreamResponse */
        startStreamResponse?: (CloudLark.IStartStreamResponse|null);

        /** ToClientMessage webrtcOfferAnswer */
        webrtcOfferAnswer?: (CloudLark.IWebrtcOfferAnswer|null);

        /** ToClientMessage webrtcIcecandidate */
        webrtcIcecandidate?: (CloudLark.IWebrtcIceCandidate|null);

        /** ToClientMessage webrtcError */
        webrtcError?: (CloudLark.IWebrtcError|null);

        /** ToClientMessage processNotifi */
        processNotifi?: (CloudLark.IAppProcessNotification|null);

        /** ToClientMessage logout */
        logout?: (CloudLark.INotifyClientLogout|null);

        /** ToClientMessage startVrstreamResponse */
        startVrstreamResponse?: (CloudLark.IStartVrStreamResponse|null);

        /** ToClientMessage vrMonitorResponse */
        vrMonitorResponse?: (CloudLark.IVrMonitorResponse|null);
    }

    /** Represents a ToClientMessage. */
    class ToClientMessage implements IToClientMessage {

        /**
         * Constructs a new ToClientMessage.
         * @param [properties] Properties to set
         */
        constructor(properties?: CloudLark.IToClientMessage);

        /** ToClientMessage magic. */
        public magic: number;

        /** ToClientMessage versionCheckResponse. */
        public versionCheckResponse?: (CloudLark.IVersionCheckResponse|null);

        /** ToClientMessage taskResponse. */
        public taskResponse?: (CloudLark.ITaskResponse|null);

        /** ToClientMessage startStreamResponse. */
        public startStreamResponse?: (CloudLark.IStartStreamResponse|null);

        /** ToClientMessage webrtcOfferAnswer. */
        public webrtcOfferAnswer?: (CloudLark.IWebrtcOfferAnswer|null);

        /** ToClientMessage webrtcIcecandidate. */
        public webrtcIcecandidate?: (CloudLark.IWebrtcIceCandidate|null);

        /** ToClientMessage webrtcError. */
        public webrtcError?: (CloudLark.IWebrtcError|null);

        /** ToClientMessage processNotifi. */
        public processNotifi?: (CloudLark.IAppProcessNotification|null);

        /** ToClientMessage logout. */
        public logout?: (CloudLark.INotifyClientLogout|null);

        /** ToClientMessage startVrstreamResponse. */
        public startVrstreamResponse?: (CloudLark.IStartVrStreamResponse|null);

        /** ToClientMessage vrMonitorResponse. */
        public vrMonitorResponse?: (CloudLark.IVrMonitorResponse|null);

        /** ToClientMessage msg. */
        public msg?: ("versionCheckResponse"|"taskResponse"|"startStreamResponse"|"webrtcOfferAnswer"|"webrtcIcecandidate"|"webrtcError"|"processNotifi"|"logout"|"startVrstreamResponse"|"vrMonitorResponse");

        /**
         * Creates a new ToClientMessage instance using the specified properties.
         * @param [properties] Properties to set
         * @returns ToClientMessage instance
         */
        public static create(properties?: CloudLark.IToClientMessage): CloudLark.ToClientMessage;

        /**
         * Encodes the specified ToClientMessage message. Does not implicitly {@link CloudLark.ToClientMessage.verify|verify} messages.
         * @param message ToClientMessage message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: CloudLark.IToClientMessage, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified ToClientMessage message, length delimited. Does not implicitly {@link CloudLark.ToClientMessage.verify|verify} messages.
         * @param message ToClientMessage message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: CloudLark.IToClientMessage, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a ToClientMessage message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns ToClientMessage
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): CloudLark.ToClientMessage;

        /**
         * Decodes a ToClientMessage message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns ToClientMessage
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): CloudLark.ToClientMessage;

        /**
         * Verifies a ToClientMessage message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a ToClientMessage message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns ToClientMessage
         */
        public static fromObject(object: { [k: string]: any }): CloudLark.ToClientMessage;

        /**
         * Creates a plain object from a ToClientMessage message. Also converts values to other types if specified.
         * @param message ToClientMessage
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: CloudLark.ToClientMessage, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this ToClientMessage to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a MouseMove. */
    interface IMouseMove {

        /** MouseMove PosX */
        PosX?: (number|null);

        /** MouseMove PosY */
        PosY?: (number|null);

        /** MouseMove DeltaX */
        DeltaX?: (number|null);

        /** MouseMove DeltaY */
        DeltaY?: (number|null);
    }

    /** Represents a MouseMove. */
    class MouseMove implements IMouseMove {

        /**
         * Constructs a new MouseMove.
         * @param [properties] Properties to set
         */
        constructor(properties?: CloudLark.IMouseMove);

        /** MouseMove PosX. */
        public PosX: number;

        /** MouseMove PosY. */
        public PosY: number;

        /** MouseMove DeltaX. */
        public DeltaX: number;

        /** MouseMove DeltaY. */
        public DeltaY: number;

        /**
         * Creates a new MouseMove instance using the specified properties.
         * @param [properties] Properties to set
         * @returns MouseMove instance
         */
        public static create(properties?: CloudLark.IMouseMove): CloudLark.MouseMove;

        /**
         * Encodes the specified MouseMove message. Does not implicitly {@link CloudLark.MouseMove.verify|verify} messages.
         * @param message MouseMove message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: CloudLark.IMouseMove, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified MouseMove message, length delimited. Does not implicitly {@link CloudLark.MouseMove.verify|verify} messages.
         * @param message MouseMove message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: CloudLark.IMouseMove, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a MouseMove message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns MouseMove
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): CloudLark.MouseMove;

        /**
         * Decodes a MouseMove message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns MouseMove
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): CloudLark.MouseMove;

        /**
         * Verifies a MouseMove message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a MouseMove message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns MouseMove
         */
        public static fromObject(object: { [k: string]: any }): CloudLark.MouseMove;

        /**
         * Creates a plain object from a MouseMove message. Also converts values to other types if specified.
         * @param message MouseMove
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: CloudLark.MouseMove, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this MouseMove to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** MouseKey enum. */
    enum MouseKey {
        LEFT = 0,
        RIGHT = 1,
        MIDDLE = 2
    }

    /** Properties of a MouseDown. */
    interface IMouseDown {

        /** MouseDown PosX */
        PosX?: (number|null);

        /** MouseDown PosY */
        PosY?: (number|null);

        /** MouseDown key */
        key?: (CloudLark.MouseKey|null);
    }

    /** Represents a MouseDown. */
    class MouseDown implements IMouseDown {

        /**
         * Constructs a new MouseDown.
         * @param [properties] Properties to set
         */
        constructor(properties?: CloudLark.IMouseDown);

        /** MouseDown PosX. */
        public PosX: number;

        /** MouseDown PosY. */
        public PosY: number;

        /** MouseDown key. */
        public key: CloudLark.MouseKey;

        /**
         * Creates a new MouseDown instance using the specified properties.
         * @param [properties] Properties to set
         * @returns MouseDown instance
         */
        public static create(properties?: CloudLark.IMouseDown): CloudLark.MouseDown;

        /**
         * Encodes the specified MouseDown message. Does not implicitly {@link CloudLark.MouseDown.verify|verify} messages.
         * @param message MouseDown message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: CloudLark.IMouseDown, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified MouseDown message, length delimited. Does not implicitly {@link CloudLark.MouseDown.verify|verify} messages.
         * @param message MouseDown message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: CloudLark.IMouseDown, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a MouseDown message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns MouseDown
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): CloudLark.MouseDown;

        /**
         * Decodes a MouseDown message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns MouseDown
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): CloudLark.MouseDown;

        /**
         * Verifies a MouseDown message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a MouseDown message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns MouseDown
         */
        public static fromObject(object: { [k: string]: any }): CloudLark.MouseDown;

        /**
         * Creates a plain object from a MouseDown message. Also converts values to other types if specified.
         * @param message MouseDown
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: CloudLark.MouseDown, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this MouseDown to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a MouseUp. */
    interface IMouseUp {

        /** MouseUp PosX */
        PosX?: (number|null);

        /** MouseUp PosY */
        PosY?: (number|null);

        /** MouseUp key */
        key?: (CloudLark.MouseKey|null);
    }

    /** Represents a MouseUp. */
    class MouseUp implements IMouseUp {

        /**
         * Constructs a new MouseUp.
         * @param [properties] Properties to set
         */
        constructor(properties?: CloudLark.IMouseUp);

        /** MouseUp PosX. */
        public PosX: number;

        /** MouseUp PosY. */
        public PosY: number;

        /** MouseUp key. */
        public key: CloudLark.MouseKey;

        /**
         * Creates a new MouseUp instance using the specified properties.
         * @param [properties] Properties to set
         * @returns MouseUp instance
         */
        public static create(properties?: CloudLark.IMouseUp): CloudLark.MouseUp;

        /**
         * Encodes the specified MouseUp message. Does not implicitly {@link CloudLark.MouseUp.verify|verify} messages.
         * @param message MouseUp message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: CloudLark.IMouseUp, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified MouseUp message, length delimited. Does not implicitly {@link CloudLark.MouseUp.verify|verify} messages.
         * @param message MouseUp message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: CloudLark.IMouseUp, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a MouseUp message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns MouseUp
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): CloudLark.MouseUp;

        /**
         * Decodes a MouseUp message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns MouseUp
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): CloudLark.MouseUp;

        /**
         * Verifies a MouseUp message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a MouseUp message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns MouseUp
         */
        public static fromObject(object: { [k: string]: any }): CloudLark.MouseUp;

        /**
         * Creates a plain object from a MouseUp message. Also converts values to other types if specified.
         * @param message MouseUp
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: CloudLark.MouseUp, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this MouseUp to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a MouseWheel. */
    interface IMouseWheel {

        /** MouseWheel PosX */
        PosX?: (number|null);

        /** MouseWheel PosY */
        PosY?: (number|null);

        /** MouseWheel Delata */
        Delata?: (number|null);
    }

    /** Represents a MouseWheel. */
    class MouseWheel implements IMouseWheel {

        /**
         * Constructs a new MouseWheel.
         * @param [properties] Properties to set
         */
        constructor(properties?: CloudLark.IMouseWheel);

        /** MouseWheel PosX. */
        public PosX: number;

        /** MouseWheel PosY. */
        public PosY: number;

        /** MouseWheel Delata. */
        public Delata: number;

        /**
         * Creates a new MouseWheel instance using the specified properties.
         * @param [properties] Properties to set
         * @returns MouseWheel instance
         */
        public static create(properties?: CloudLark.IMouseWheel): CloudLark.MouseWheel;

        /**
         * Encodes the specified MouseWheel message. Does not implicitly {@link CloudLark.MouseWheel.verify|verify} messages.
         * @param message MouseWheel message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: CloudLark.IMouseWheel, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified MouseWheel message, length delimited. Does not implicitly {@link CloudLark.MouseWheel.verify|verify} messages.
         * @param message MouseWheel message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: CloudLark.IMouseWheel, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a MouseWheel message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns MouseWheel
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): CloudLark.MouseWheel;

        /**
         * Decodes a MouseWheel message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns MouseWheel
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): CloudLark.MouseWheel;

        /**
         * Verifies a MouseWheel message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a MouseWheel message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns MouseWheel
         */
        public static fromObject(object: { [k: string]: any }): CloudLark.MouseWheel;

        /**
         * Creates a plain object from a MouseWheel message. Also converts values to other types if specified.
         * @param message MouseWheel
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: CloudLark.MouseWheel, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this MouseWheel to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a KeyDown. */
    interface IKeyDown {

        /** KeyDown key */
        key?: (number|null);

        /** KeyDown isRepeat */
        isRepeat?: (boolean|null);
    }

    /** Represents a KeyDown. */
    class KeyDown implements IKeyDown {

        /**
         * Constructs a new KeyDown.
         * @param [properties] Properties to set
         */
        constructor(properties?: CloudLark.IKeyDown);

        /** KeyDown key. */
        public key: number;

        /** KeyDown isRepeat. */
        public isRepeat: boolean;

        /**
         * Creates a new KeyDown instance using the specified properties.
         * @param [properties] Properties to set
         * @returns KeyDown instance
         */
        public static create(properties?: CloudLark.IKeyDown): CloudLark.KeyDown;

        /**
         * Encodes the specified KeyDown message. Does not implicitly {@link CloudLark.KeyDown.verify|verify} messages.
         * @param message KeyDown message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: CloudLark.IKeyDown, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified KeyDown message, length delimited. Does not implicitly {@link CloudLark.KeyDown.verify|verify} messages.
         * @param message KeyDown message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: CloudLark.IKeyDown, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a KeyDown message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns KeyDown
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): CloudLark.KeyDown;

        /**
         * Decodes a KeyDown message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns KeyDown
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): CloudLark.KeyDown;

        /**
         * Verifies a KeyDown message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a KeyDown message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns KeyDown
         */
        public static fromObject(object: { [k: string]: any }): CloudLark.KeyDown;

        /**
         * Creates a plain object from a KeyDown message. Also converts values to other types if specified.
         * @param message KeyDown
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: CloudLark.KeyDown, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this KeyDown to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a KeyUp. */
    interface IKeyUp {

        /** KeyUp key */
        key?: (number|null);
    }

    /** Represents a KeyUp. */
    class KeyUp implements IKeyUp {

        /**
         * Constructs a new KeyUp.
         * @param [properties] Properties to set
         */
        constructor(properties?: CloudLark.IKeyUp);

        /** KeyUp key. */
        public key: number;

        /**
         * Creates a new KeyUp instance using the specified properties.
         * @param [properties] Properties to set
         * @returns KeyUp instance
         */
        public static create(properties?: CloudLark.IKeyUp): CloudLark.KeyUp;

        /**
         * Encodes the specified KeyUp message. Does not implicitly {@link CloudLark.KeyUp.verify|verify} messages.
         * @param message KeyUp message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: CloudLark.IKeyUp, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified KeyUp message, length delimited. Does not implicitly {@link CloudLark.KeyUp.verify|verify} messages.
         * @param message KeyUp message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: CloudLark.IKeyUp, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a KeyUp message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns KeyUp
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): CloudLark.KeyUp;

        /**
         * Decodes a KeyUp message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns KeyUp
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): CloudLark.KeyUp;

        /**
         * Verifies a KeyUp message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a KeyUp message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns KeyUp
         */
        public static fromObject(object: { [k: string]: any }): CloudLark.KeyUp;

        /**
         * Creates a plain object from a KeyUp message. Also converts values to other types if specified.
         * @param message KeyUp
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: CloudLark.KeyUp, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this KeyUp to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a ClientEnter. */
    interface IClientEnter {

        /** ClientEnter CapsLockState */
        CapsLockState?: (boolean|null);
    }

    /** Represents a ClientEnter. */
    class ClientEnter implements IClientEnter {

        /**
         * Constructs a new ClientEnter.
         * @param [properties] Properties to set
         */
        constructor(properties?: CloudLark.IClientEnter);

        /** ClientEnter CapsLockState. */
        public CapsLockState: boolean;

        /**
         * Creates a new ClientEnter instance using the specified properties.
         * @param [properties] Properties to set
         * @returns ClientEnter instance
         */
        public static create(properties?: CloudLark.IClientEnter): CloudLark.ClientEnter;

        /**
         * Encodes the specified ClientEnter message. Does not implicitly {@link CloudLark.ClientEnter.verify|verify} messages.
         * @param message ClientEnter message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: CloudLark.IClientEnter, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified ClientEnter message, length delimited. Does not implicitly {@link CloudLark.ClientEnter.verify|verify} messages.
         * @param message ClientEnter message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: CloudLark.IClientEnter, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a ClientEnter message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns ClientEnter
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): CloudLark.ClientEnter;

        /**
         * Decodes a ClientEnter message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns ClientEnter
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): CloudLark.ClientEnter;

        /**
         * Verifies a ClientEnter message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a ClientEnter message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns ClientEnter
         */
        public static fromObject(object: { [k: string]: any }): CloudLark.ClientEnter;

        /**
         * Creates a plain object from a ClientEnter message. Also converts values to other types if specified.
         * @param message ClientEnter
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: CloudLark.ClientEnter, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this ClientEnter to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a ClientLeave. */
    interface IClientLeave {
    }

    /** Represents a ClientLeave. */
    class ClientLeave implements IClientLeave {

        /**
         * Constructs a new ClientLeave.
         * @param [properties] Properties to set
         */
        constructor(properties?: CloudLark.IClientLeave);

        /**
         * Creates a new ClientLeave instance using the specified properties.
         * @param [properties] Properties to set
         * @returns ClientLeave instance
         */
        public static create(properties?: CloudLark.IClientLeave): CloudLark.ClientLeave;

        /**
         * Encodes the specified ClientLeave message. Does not implicitly {@link CloudLark.ClientLeave.verify|verify} messages.
         * @param message ClientLeave message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: CloudLark.IClientLeave, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified ClientLeave message, length delimited. Does not implicitly {@link CloudLark.ClientLeave.verify|verify} messages.
         * @param message ClientLeave message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: CloudLark.IClientLeave, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a ClientLeave message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns ClientLeave
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): CloudLark.ClientLeave;

        /**
         * Decodes a ClientLeave message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns ClientLeave
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): CloudLark.ClientLeave;

        /**
         * Verifies a ClientLeave message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a ClientLeave message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns ClientLeave
         */
        public static fromObject(object: { [k: string]: any }): CloudLark.ClientLeave;

        /**
         * Creates a plain object from a ClientLeave message. Also converts values to other types if specified.
         * @param message ClientLeave
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: CloudLark.ClientLeave, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this ClientLeave to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a TouchUp. */
    interface ITouchUp {

        /** TouchUp PosX */
        PosX?: (number|null);

        /** TouchUp PosY */
        PosY?: (number|null);

        /** TouchUp time */
        time?: (number|null);

        /** TouchUp ID */
        ID?: (number|null);
    }

    /** Represents a TouchUp. */
    class TouchUp implements ITouchUp {

        /**
         * Constructs a new TouchUp.
         * @param [properties] Properties to set
         */
        constructor(properties?: CloudLark.ITouchUp);

        /** TouchUp PosX. */
        public PosX: number;

        /** TouchUp PosY. */
        public PosY: number;

        /** TouchUp time. */
        public time: (number);

        /** TouchUp ID. */
        public ID: number;

        /**
         * Creates a new TouchUp instance using the specified properties.
         * @param [properties] Properties to set
         * @returns TouchUp instance
         */
        public static create(properties?: CloudLark.ITouchUp): CloudLark.TouchUp;

        /**
         * Encodes the specified TouchUp message. Does not implicitly {@link CloudLark.TouchUp.verify|verify} messages.
         * @param message TouchUp message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: CloudLark.ITouchUp, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified TouchUp message, length delimited. Does not implicitly {@link CloudLark.TouchUp.verify|verify} messages.
         * @param message TouchUp message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: CloudLark.ITouchUp, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a TouchUp message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns TouchUp
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): CloudLark.TouchUp;

        /**
         * Decodes a TouchUp message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns TouchUp
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): CloudLark.TouchUp;

        /**
         * Verifies a TouchUp message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a TouchUp message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns TouchUp
         */
        public static fromObject(object: { [k: string]: any }): CloudLark.TouchUp;

        /**
         * Creates a plain object from a TouchUp message. Also converts values to other types if specified.
         * @param message TouchUp
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: CloudLark.TouchUp, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this TouchUp to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a TouchDown. */
    interface ITouchDown {

        /** TouchDown PosX */
        PosX?: (number|null);

        /** TouchDown PosY */
        PosY?: (number|null);

        /** TouchDown time */
        time?: (number|null);

        /** TouchDown ID */
        ID?: (number|null);
    }

    /** Represents a TouchDown. */
    class TouchDown implements ITouchDown {

        /**
         * Constructs a new TouchDown.
         * @param [properties] Properties to set
         */
        constructor(properties?: CloudLark.ITouchDown);

        /** TouchDown PosX. */
        public PosX: number;

        /** TouchDown PosY. */
        public PosY: number;

        /** TouchDown time. */
        public time: (number);

        /** TouchDown ID. */
        public ID: number;

        /**
         * Creates a new TouchDown instance using the specified properties.
         * @param [properties] Properties to set
         * @returns TouchDown instance
         */
        public static create(properties?: CloudLark.ITouchDown): CloudLark.TouchDown;

        /**
         * Encodes the specified TouchDown message. Does not implicitly {@link CloudLark.TouchDown.verify|verify} messages.
         * @param message TouchDown message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: CloudLark.ITouchDown, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified TouchDown message, length delimited. Does not implicitly {@link CloudLark.TouchDown.verify|verify} messages.
         * @param message TouchDown message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: CloudLark.ITouchDown, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a TouchDown message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns TouchDown
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): CloudLark.TouchDown;

        /**
         * Decodes a TouchDown message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns TouchDown
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): CloudLark.TouchDown;

        /**
         * Verifies a TouchDown message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a TouchDown message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns TouchDown
         */
        public static fromObject(object: { [k: string]: any }): CloudLark.TouchDown;

        /**
         * Creates a plain object from a TouchDown message. Also converts values to other types if specified.
         * @param message TouchDown
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: CloudLark.TouchDown, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this TouchDown to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a TouchMove. */
    interface ITouchMove {

        /** TouchMove PosX */
        PosX?: (number|null);

        /** TouchMove PosY */
        PosY?: (number|null);

        /** TouchMove time */
        time?: (number|null);

        /** TouchMove ID */
        ID?: (number|null);
    }

    /** Represents a TouchMove. */
    class TouchMove implements ITouchMove {

        /**
         * Constructs a new TouchMove.
         * @param [properties] Properties to set
         */
        constructor(properties?: CloudLark.ITouchMove);

        /** TouchMove PosX. */
        public PosX: number;

        /** TouchMove PosY. */
        public PosY: number;

        /** TouchMove time. */
        public time: (number);

        /** TouchMove ID. */
        public ID: number;

        /**
         * Creates a new TouchMove instance using the specified properties.
         * @param [properties] Properties to set
         * @returns TouchMove instance
         */
        public static create(properties?: CloudLark.ITouchMove): CloudLark.TouchMove;

        /**
         * Encodes the specified TouchMove message. Does not implicitly {@link CloudLark.TouchMove.verify|verify} messages.
         * @param message TouchMove message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: CloudLark.ITouchMove, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified TouchMove message, length delimited. Does not implicitly {@link CloudLark.TouchMove.verify|verify} messages.
         * @param message TouchMove message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: CloudLark.ITouchMove, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a TouchMove message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns TouchMove
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): CloudLark.TouchMove;

        /**
         * Decodes a TouchMove message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns TouchMove
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): CloudLark.TouchMove;

        /**
         * Verifies a TouchMove message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a TouchMove message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns TouchMove
         */
        public static fromObject(object: { [k: string]: any }): CloudLark.TouchMove;

        /**
         * Creates a plain object from a TouchMove message. Also converts values to other types if specified.
         * @param message TouchMove
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: CloudLark.TouchMove, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this TouchMove to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of an AppResize. */
    interface IAppResize {

        /** AppResize width */
        width?: (number|null);

        /** AppResize height */
        height?: (number|null);
    }

    /** Represents an AppResize. */
    class AppResize implements IAppResize {

        /**
         * Constructs a new AppResize.
         * @param [properties] Properties to set
         */
        constructor(properties?: CloudLark.IAppResize);

        /** AppResize width. */
        public width: number;

        /** AppResize height. */
        public height: number;

        /**
         * Creates a new AppResize instance using the specified properties.
         * @param [properties] Properties to set
         * @returns AppResize instance
         */
        public static create(properties?: CloudLark.IAppResize): CloudLark.AppResize;

        /**
         * Encodes the specified AppResize message. Does not implicitly {@link CloudLark.AppResize.verify|verify} messages.
         * @param message AppResize message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: CloudLark.IAppResize, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified AppResize message, length delimited. Does not implicitly {@link CloudLark.AppResize.verify|verify} messages.
         * @param message AppResize message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: CloudLark.IAppResize, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes an AppResize message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns AppResize
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): CloudLark.AppResize;

        /**
         * Decodes an AppResize message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns AppResize
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): CloudLark.AppResize;

        /**
         * Verifies an AppResize message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates an AppResize message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns AppResize
         */
        public static fromObject(object: { [k: string]: any }): CloudLark.AppResize;

        /**
         * Creates a plain object from an AppResize message. Also converts values to other types if specified.
         * @param message AppResize
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: CloudLark.AppResize, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this AppResize to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a MouseLockRect. */
    interface IMouseLockRect {

        /** MouseLockRect top */
        top?: (number|null);

        /** MouseLockRect left */
        left?: (number|null);

        /** MouseLockRect right */
        right?: (number|null);

        /** MouseLockRect bottom */
        bottom?: (number|null);
    }

    /** Represents a MouseLockRect. */
    class MouseLockRect implements IMouseLockRect {

        /**
         * Constructs a new MouseLockRect.
         * @param [properties] Properties to set
         */
        constructor(properties?: CloudLark.IMouseLockRect);

        /** MouseLockRect top. */
        public top: number;

        /** MouseLockRect left. */
        public left: number;

        /** MouseLockRect right. */
        public right: number;

        /** MouseLockRect bottom. */
        public bottom: number;

        /**
         * Creates a new MouseLockRect instance using the specified properties.
         * @param [properties] Properties to set
         * @returns MouseLockRect instance
         */
        public static create(properties?: CloudLark.IMouseLockRect): CloudLark.MouseLockRect;

        /**
         * Encodes the specified MouseLockRect message. Does not implicitly {@link CloudLark.MouseLockRect.verify|verify} messages.
         * @param message MouseLockRect message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: CloudLark.IMouseLockRect, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified MouseLockRect message, length delimited. Does not implicitly {@link CloudLark.MouseLockRect.verify|verify} messages.
         * @param message MouseLockRect message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: CloudLark.IMouseLockRect, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a MouseLockRect message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns MouseLockRect
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): CloudLark.MouseLockRect;

        /**
         * Decodes a MouseLockRect message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns MouseLockRect
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): CloudLark.MouseLockRect;

        /**
         * Verifies a MouseLockRect message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a MouseLockRect message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns MouseLockRect
         */
        public static fromObject(object: { [k: string]: any }): CloudLark.MouseLockRect;

        /**
         * Creates a plain object from a MouseLockRect message. Also converts values to other types if specified.
         * @param message MouseLockRect
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: CloudLark.MouseLockRect, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this MouseLockRect to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of an AppMouseMode. */
    interface IAppMouseMode {

        /** AppMouseMode mouseShow */
        mouseShow?: (boolean|null);

        /** AppMouseMode mouseLock */
        mouseLock?: (boolean|null);

        /** AppMouseMode mouseRelative */
        mouseRelative?: (boolean|null);

        /** AppMouseMode rect */
        rect?: (CloudLark.IMouseLockRect|null);
    }

    /** Represents an AppMouseMode. */
    class AppMouseMode implements IAppMouseMode {

        /**
         * Constructs a new AppMouseMode.
         * @param [properties] Properties to set
         */
        constructor(properties?: CloudLark.IAppMouseMode);

        /** AppMouseMode mouseShow. */
        public mouseShow: boolean;

        /** AppMouseMode mouseLock. */
        public mouseLock: boolean;

        /** AppMouseMode mouseRelative. */
        public mouseRelative: boolean;

        /** AppMouseMode rect. */
        public rect?: (CloudLark.IMouseLockRect|null);

        /**
         * Creates a new AppMouseMode instance using the specified properties.
         * @param [properties] Properties to set
         * @returns AppMouseMode instance
         */
        public static create(properties?: CloudLark.IAppMouseMode): CloudLark.AppMouseMode;

        /**
         * Encodes the specified AppMouseMode message. Does not implicitly {@link CloudLark.AppMouseMode.verify|verify} messages.
         * @param message AppMouseMode message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: CloudLark.IAppMouseMode, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified AppMouseMode message, length delimited. Does not implicitly {@link CloudLark.AppMouseMode.verify|verify} messages.
         * @param message AppMouseMode message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: CloudLark.IAppMouseMode, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes an AppMouseMode message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns AppMouseMode
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): CloudLark.AppMouseMode;

        /**
         * Decodes an AppMouseMode message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns AppMouseMode
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): CloudLark.AppMouseMode;

        /**
         * Verifies an AppMouseMode message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates an AppMouseMode message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns AppMouseMode
         */
        public static fromObject(object: { [k: string]: any }): CloudLark.AppMouseMode;

        /**
         * Creates a plain object from an AppMouseMode message. Also converts values to other types if specified.
         * @param message AppMouseMode
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: CloudLark.AppMouseMode, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this AppMouseMode to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a PlayerDesc. */
    interface IPlayerDesc {

        /** PlayerDesc id */
        id?: (number|null);

        /** PlayerDesc nickName */
        nickName?: (string|null);

        /** PlayerDesc taskOwner */
        taskOwner?: (boolean|null);

        /** PlayerDesc controller */
        controller?: (boolean|null);
    }

    /** Represents a PlayerDesc. */
    class PlayerDesc implements IPlayerDesc {

        /**
         * Constructs a new PlayerDesc.
         * @param [properties] Properties to set
         */
        constructor(properties?: CloudLark.IPlayerDesc);

        /** PlayerDesc id. */
        public id: number;

        /** PlayerDesc nickName. */
        public nickName: string;

        /** PlayerDesc taskOwner. */
        public taskOwner: boolean;

        /** PlayerDesc controller. */
        public controller: boolean;

        /**
         * Creates a new PlayerDesc instance using the specified properties.
         * @param [properties] Properties to set
         * @returns PlayerDesc instance
         */
        public static create(properties?: CloudLark.IPlayerDesc): CloudLark.PlayerDesc;

        /**
         * Encodes the specified PlayerDesc message. Does not implicitly {@link CloudLark.PlayerDesc.verify|verify} messages.
         * @param message PlayerDesc message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: CloudLark.IPlayerDesc, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified PlayerDesc message, length delimited. Does not implicitly {@link CloudLark.PlayerDesc.verify|verify} messages.
         * @param message PlayerDesc message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: CloudLark.IPlayerDesc, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a PlayerDesc message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns PlayerDesc
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): CloudLark.PlayerDesc;

        /**
         * Decodes a PlayerDesc message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns PlayerDesc
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): CloudLark.PlayerDesc;

        /**
         * Verifies a PlayerDesc message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a PlayerDesc message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns PlayerDesc
         */
        public static fromObject(object: { [k: string]: any }): CloudLark.PlayerDesc;

        /**
         * Creates a plain object from a PlayerDesc message. Also converts values to other types if specified.
         * @param message PlayerDesc
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: CloudLark.PlayerDesc, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this PlayerDesc to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of an UpdatePlayersDesc. */
    interface IUpdatePlayersDesc {

        /** UpdatePlayersDesc descs */
        descs?: (CloudLark.IPlayerDesc[]|null);
    }

    /** Represents an UpdatePlayersDesc. */
    class UpdatePlayersDesc implements IUpdatePlayersDesc {

        /**
         * Constructs a new UpdatePlayersDesc.
         * @param [properties] Properties to set
         */
        constructor(properties?: CloudLark.IUpdatePlayersDesc);

        /** UpdatePlayersDesc descs. */
        public descs: CloudLark.IPlayerDesc[];

        /**
         * Creates a new UpdatePlayersDesc instance using the specified properties.
         * @param [properties] Properties to set
         * @returns UpdatePlayersDesc instance
         */
        public static create(properties?: CloudLark.IUpdatePlayersDesc): CloudLark.UpdatePlayersDesc;

        /**
         * Encodes the specified UpdatePlayersDesc message. Does not implicitly {@link CloudLark.UpdatePlayersDesc.verify|verify} messages.
         * @param message UpdatePlayersDesc message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: CloudLark.IUpdatePlayersDesc, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified UpdatePlayersDesc message, length delimited. Does not implicitly {@link CloudLark.UpdatePlayersDesc.verify|verify} messages.
         * @param message UpdatePlayersDesc message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: CloudLark.IUpdatePlayersDesc, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes an UpdatePlayersDesc message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns UpdatePlayersDesc
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): CloudLark.UpdatePlayersDesc;

        /**
         * Decodes an UpdatePlayersDesc message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns UpdatePlayersDesc
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): CloudLark.UpdatePlayersDesc;

        /**
         * Verifies an UpdatePlayersDesc message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates an UpdatePlayersDesc message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns UpdatePlayersDesc
         */
        public static fromObject(object: { [k: string]: any }): CloudLark.UpdatePlayersDesc;

        /**
         * Creates a plain object from an UpdatePlayersDesc message. Also converts values to other types if specified.
         * @param message UpdatePlayersDesc
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: CloudLark.UpdatePlayersDesc, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this UpdatePlayersDesc to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of an AppRequestInput. */
    interface IAppRequestInput {

        /** AppRequestInput inputmethodenable */
        inputmethodenable?: (boolean|null);
    }

    /** Represents an AppRequestInput. */
    class AppRequestInput implements IAppRequestInput {

        /**
         * Constructs a new AppRequestInput.
         * @param [properties] Properties to set
         */
        constructor(properties?: CloudLark.IAppRequestInput);

        /** AppRequestInput inputmethodenable. */
        public inputmethodenable: boolean;

        /**
         * Creates a new AppRequestInput instance using the specified properties.
         * @param [properties] Properties to set
         * @returns AppRequestInput instance
         */
        public static create(properties?: CloudLark.IAppRequestInput): CloudLark.AppRequestInput;

        /**
         * Encodes the specified AppRequestInput message. Does not implicitly {@link CloudLark.AppRequestInput.verify|verify} messages.
         * @param message AppRequestInput message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: CloudLark.IAppRequestInput, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified AppRequestInput message, length delimited. Does not implicitly {@link CloudLark.AppRequestInput.verify|verify} messages.
         * @param message AppRequestInput message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: CloudLark.IAppRequestInput, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes an AppRequestInput message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns AppRequestInput
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): CloudLark.AppRequestInput;

        /**
         * Decodes an AppRequestInput message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns AppRequestInput
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): CloudLark.AppRequestInput;

        /**
         * Verifies an AppRequestInput message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates an AppRequestInput message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns AppRequestInput
         */
        public static fromObject(object: { [k: string]: any }): CloudLark.AppRequestInput;

        /**
         * Creates a plain object from an AppRequestInput message. Also converts values to other types if specified.
         * @param message AppRequestInput
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: CloudLark.AppRequestInput, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this AppRequestInput to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a DispatchController. */
    interface IDispatchController {

        /** DispatchController id */
        id?: (number|null);
    }

    /** Represents a DispatchController. */
    class DispatchController implements IDispatchController {

        /**
         * Constructs a new DispatchController.
         * @param [properties] Properties to set
         */
        constructor(properties?: CloudLark.IDispatchController);

        /** DispatchController id. */
        public id: number;

        /**
         * Creates a new DispatchController instance using the specified properties.
         * @param [properties] Properties to set
         * @returns DispatchController instance
         */
        public static create(properties?: CloudLark.IDispatchController): CloudLark.DispatchController;

        /**
         * Encodes the specified DispatchController message. Does not implicitly {@link CloudLark.DispatchController.verify|verify} messages.
         * @param message DispatchController message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: CloudLark.IDispatchController, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified DispatchController message, length delimited. Does not implicitly {@link CloudLark.DispatchController.verify|verify} messages.
         * @param message DispatchController message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: CloudLark.IDispatchController, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a DispatchController message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns DispatchController
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): CloudLark.DispatchController;

        /**
         * Decodes a DispatchController message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns DispatchController
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): CloudLark.DispatchController;

        /**
         * Verifies a DispatchController message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a DispatchController message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns DispatchController
         */
        public static fromObject(object: { [k: string]: any }): CloudLark.DispatchController;

        /**
         * Creates a plain object from a DispatchController message. Also converts values to other types if specified.
         * @param message DispatchController
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: CloudLark.DispatchController, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this DispatchController to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a RequestController. */
    interface IRequestController {

        /** RequestController enable */
        enable?: (boolean|null);
    }

    /** Represents a RequestController. */
    class RequestController implements IRequestController {

        /**
         * Constructs a new RequestController.
         * @param [properties] Properties to set
         */
        constructor(properties?: CloudLark.IRequestController);

        /** RequestController enable. */
        public enable: boolean;

        /**
         * Creates a new RequestController instance using the specified properties.
         * @param [properties] Properties to set
         * @returns RequestController instance
         */
        public static create(properties?: CloudLark.IRequestController): CloudLark.RequestController;

        /**
         * Encodes the specified RequestController message. Does not implicitly {@link CloudLark.RequestController.verify|verify} messages.
         * @param message RequestController message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: CloudLark.IRequestController, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified RequestController message, length delimited. Does not implicitly {@link CloudLark.RequestController.verify|verify} messages.
         * @param message RequestController message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: CloudLark.IRequestController, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a RequestController message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns RequestController
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): CloudLark.RequestController;

        /**
         * Decodes a RequestController message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns RequestController
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): CloudLark.RequestController;

        /**
         * Verifies a RequestController message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a RequestController message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns RequestController
         */
        public static fromObject(object: { [k: string]: any }): CloudLark.RequestController;

        /**
         * Creates a plain object from a RequestController message. Also converts values to other types if specified.
         * @param message RequestController
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: CloudLark.RequestController, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this RequestController to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a TextInput. */
    interface ITextInput {

        /** TextInput content */
        content?: (string|null);
    }

    /** Represents a TextInput. */
    class TextInput implements ITextInput {

        /**
         * Constructs a new TextInput.
         * @param [properties] Properties to set
         */
        constructor(properties?: CloudLark.ITextInput);

        /** TextInput content. */
        public content: string;

        /**
         * Creates a new TextInput instance using the specified properties.
         * @param [properties] Properties to set
         * @returns TextInput instance
         */
        public static create(properties?: CloudLark.ITextInput): CloudLark.TextInput;

        /**
         * Encodes the specified TextInput message. Does not implicitly {@link CloudLark.TextInput.verify|verify} messages.
         * @param message TextInput message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: CloudLark.ITextInput, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified TextInput message, length delimited. Does not implicitly {@link CloudLark.TextInput.verify|verify} messages.
         * @param message TextInput message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: CloudLark.ITextInput, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a TextInput message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns TextInput
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): CloudLark.TextInput;

        /**
         * Decodes a TextInput message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns TextInput
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): CloudLark.TextInput;

        /**
         * Verifies a TextInput message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a TextInput message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns TextInput
         */
        public static fromObject(object: { [k: string]: any }): CloudLark.TextInput;

        /**
         * Creates a plain object from a TextInput message. Also converts values to other types if specified.
         * @param message TextInput
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: CloudLark.TextInput, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this TextInput to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a GamepadInputButtonDown. */
    interface IGamepadInputButtonDown {

        /** GamepadInputButtonDown userIndex */
        userIndex?: (number|null);

        /** GamepadInputButtonDown button */
        button?: (number|null);

        /** GamepadInputButtonDown isRepeat */
        isRepeat?: (boolean|null);
    }

    /** Represents a GamepadInputButtonDown. */
    class GamepadInputButtonDown implements IGamepadInputButtonDown {

        /**
         * Constructs a new GamepadInputButtonDown.
         * @param [properties] Properties to set
         */
        constructor(properties?: CloudLark.IGamepadInputButtonDown);

        /** GamepadInputButtonDown userIndex. */
        public userIndex: number;

        /** GamepadInputButtonDown button. */
        public button: number;

        /** GamepadInputButtonDown isRepeat. */
        public isRepeat: boolean;

        /**
         * Creates a new GamepadInputButtonDown instance using the specified properties.
         * @param [properties] Properties to set
         * @returns GamepadInputButtonDown instance
         */
        public static create(properties?: CloudLark.IGamepadInputButtonDown): CloudLark.GamepadInputButtonDown;

        /**
         * Encodes the specified GamepadInputButtonDown message. Does not implicitly {@link CloudLark.GamepadInputButtonDown.verify|verify} messages.
         * @param message GamepadInputButtonDown message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: CloudLark.IGamepadInputButtonDown, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified GamepadInputButtonDown message, length delimited. Does not implicitly {@link CloudLark.GamepadInputButtonDown.verify|verify} messages.
         * @param message GamepadInputButtonDown message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: CloudLark.IGamepadInputButtonDown, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a GamepadInputButtonDown message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns GamepadInputButtonDown
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): CloudLark.GamepadInputButtonDown;

        /**
         * Decodes a GamepadInputButtonDown message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns GamepadInputButtonDown
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): CloudLark.GamepadInputButtonDown;

        /**
         * Verifies a GamepadInputButtonDown message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a GamepadInputButtonDown message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns GamepadInputButtonDown
         */
        public static fromObject(object: { [k: string]: any }): CloudLark.GamepadInputButtonDown;

        /**
         * Creates a plain object from a GamepadInputButtonDown message. Also converts values to other types if specified.
         * @param message GamepadInputButtonDown
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: CloudLark.GamepadInputButtonDown, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this GamepadInputButtonDown to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a GamepadInputButtonUp. */
    interface IGamepadInputButtonUp {

        /** GamepadInputButtonUp userIndex */
        userIndex?: (number|null);

        /** GamepadInputButtonUp button */
        button?: (number|null);
    }

    /** Represents a GamepadInputButtonUp. */
    class GamepadInputButtonUp implements IGamepadInputButtonUp {

        /**
         * Constructs a new GamepadInputButtonUp.
         * @param [properties] Properties to set
         */
        constructor(properties?: CloudLark.IGamepadInputButtonUp);

        /** GamepadInputButtonUp userIndex. */
        public userIndex: number;

        /** GamepadInputButtonUp button. */
        public button: number;

        /**
         * Creates a new GamepadInputButtonUp instance using the specified properties.
         * @param [properties] Properties to set
         * @returns GamepadInputButtonUp instance
         */
        public static create(properties?: CloudLark.IGamepadInputButtonUp): CloudLark.GamepadInputButtonUp;

        /**
         * Encodes the specified GamepadInputButtonUp message. Does not implicitly {@link CloudLark.GamepadInputButtonUp.verify|verify} messages.
         * @param message GamepadInputButtonUp message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: CloudLark.IGamepadInputButtonUp, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified GamepadInputButtonUp message, length delimited. Does not implicitly {@link CloudLark.GamepadInputButtonUp.verify|verify} messages.
         * @param message GamepadInputButtonUp message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: CloudLark.IGamepadInputButtonUp, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a GamepadInputButtonUp message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns GamepadInputButtonUp
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): CloudLark.GamepadInputButtonUp;

        /**
         * Decodes a GamepadInputButtonUp message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns GamepadInputButtonUp
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): CloudLark.GamepadInputButtonUp;

        /**
         * Verifies a GamepadInputButtonUp message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a GamepadInputButtonUp message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns GamepadInputButtonUp
         */
        public static fromObject(object: { [k: string]: any }): CloudLark.GamepadInputButtonUp;

        /**
         * Creates a plain object from a GamepadInputButtonUp message. Also converts values to other types if specified.
         * @param message GamepadInputButtonUp
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: CloudLark.GamepadInputButtonUp, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this GamepadInputButtonUp to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a GamepadInputJoyStickStates. */
    interface IGamepadInputJoyStickStates {

        /** GamepadInputJoyStickStates userIndex */
        userIndex?: (number|null);

        /** GamepadInputJoyStickStates thumblx */
        thumblx?: (number|null);

        /** GamepadInputJoyStickStates thumbly */
        thumbly?: (number|null);

        /** GamepadInputJoyStickStates thumbrx */
        thumbrx?: (number|null);

        /** GamepadInputJoyStickStates thumbry */
        thumbry?: (number|null);
    }

    /** Represents a GamepadInputJoyStickStates. */
    class GamepadInputJoyStickStates implements IGamepadInputJoyStickStates {

        /**
         * Constructs a new GamepadInputJoyStickStates.
         * @param [properties] Properties to set
         */
        constructor(properties?: CloudLark.IGamepadInputJoyStickStates);

        /** GamepadInputJoyStickStates userIndex. */
        public userIndex: number;

        /** GamepadInputJoyStickStates thumblx. */
        public thumblx: number;

        /** GamepadInputJoyStickStates thumbly. */
        public thumbly: number;

        /** GamepadInputJoyStickStates thumbrx. */
        public thumbrx: number;

        /** GamepadInputJoyStickStates thumbry. */
        public thumbry: number;

        /**
         * Creates a new GamepadInputJoyStickStates instance using the specified properties.
         * @param [properties] Properties to set
         * @returns GamepadInputJoyStickStates instance
         */
        public static create(properties?: CloudLark.IGamepadInputJoyStickStates): CloudLark.GamepadInputJoyStickStates;

        /**
         * Encodes the specified GamepadInputJoyStickStates message. Does not implicitly {@link CloudLark.GamepadInputJoyStickStates.verify|verify} messages.
         * @param message GamepadInputJoyStickStates message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: CloudLark.IGamepadInputJoyStickStates, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified GamepadInputJoyStickStates message, length delimited. Does not implicitly {@link CloudLark.GamepadInputJoyStickStates.verify|verify} messages.
         * @param message GamepadInputJoyStickStates message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: CloudLark.IGamepadInputJoyStickStates, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a GamepadInputJoyStickStates message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns GamepadInputJoyStickStates
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): CloudLark.GamepadInputJoyStickStates;

        /**
         * Decodes a GamepadInputJoyStickStates message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns GamepadInputJoyStickStates
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): CloudLark.GamepadInputJoyStickStates;

        /**
         * Verifies a GamepadInputJoyStickStates message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a GamepadInputJoyStickStates message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns GamepadInputJoyStickStates
         */
        public static fromObject(object: { [k: string]: any }): CloudLark.GamepadInputJoyStickStates;

        /**
         * Creates a plain object from a GamepadInputJoyStickStates message. Also converts values to other types if specified.
         * @param message GamepadInputJoyStickStates
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: CloudLark.GamepadInputJoyStickStates, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this GamepadInputJoyStickStates to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a GamepadInputTriger. */
    interface IGamepadInputTriger {

        /** GamepadInputTriger userIndex */
        userIndex?: (number|null);

        /** GamepadInputTriger isleft */
        isleft?: (boolean|null);

        /** GamepadInputTriger value */
        value?: (number|null);
    }

    /** Represents a GamepadInputTriger. */
    class GamepadInputTriger implements IGamepadInputTriger {

        /**
         * Constructs a new GamepadInputTriger.
         * @param [properties] Properties to set
         */
        constructor(properties?: CloudLark.IGamepadInputTriger);

        /** GamepadInputTriger userIndex. */
        public userIndex: number;

        /** GamepadInputTriger isleft. */
        public isleft: boolean;

        /** GamepadInputTriger value. */
        public value: number;

        /**
         * Creates a new GamepadInputTriger instance using the specified properties.
         * @param [properties] Properties to set
         * @returns GamepadInputTriger instance
         */
        public static create(properties?: CloudLark.IGamepadInputTriger): CloudLark.GamepadInputTriger;

        /**
         * Encodes the specified GamepadInputTriger message. Does not implicitly {@link CloudLark.GamepadInputTriger.verify|verify} messages.
         * @param message GamepadInputTriger message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: CloudLark.IGamepadInputTriger, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified GamepadInputTriger message, length delimited. Does not implicitly {@link CloudLark.GamepadInputTriger.verify|verify} messages.
         * @param message GamepadInputTriger message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: CloudLark.IGamepadInputTriger, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a GamepadInputTriger message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns GamepadInputTriger
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): CloudLark.GamepadInputTriger;

        /**
         * Decodes a GamepadInputTriger message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns GamepadInputTriger
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): CloudLark.GamepadInputTriger;

        /**
         * Verifies a GamepadInputTriger message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a GamepadInputTriger message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns GamepadInputTriger
         */
        public static fromObject(object: { [k: string]: any }): CloudLark.GamepadInputTriger;

        /**
         * Creates a plain object from a GamepadInputTriger message. Also converts values to other types if specified.
         * @param message GamepadInputTriger
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: CloudLark.GamepadInputTriger, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this GamepadInputTriger to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a GamepadOutput. */
    interface IGamepadOutput {

        /** GamepadOutput userIndex */
        userIndex?: (number|null);

        /** GamepadOutput leftmotorspeed */
        leftmotorspeed?: (number|null);

        /** GamepadOutput rightmotorspeed */
        rightmotorspeed?: (number|null);
    }

    /** Represents a GamepadOutput. */
    class GamepadOutput implements IGamepadOutput {

        /**
         * Constructs a new GamepadOutput.
         * @param [properties] Properties to set
         */
        constructor(properties?: CloudLark.IGamepadOutput);

        /** GamepadOutput userIndex. */
        public userIndex: number;

        /** GamepadOutput leftmotorspeed. */
        public leftmotorspeed: number;

        /** GamepadOutput rightmotorspeed. */
        public rightmotorspeed: number;

        /**
         * Creates a new GamepadOutput instance using the specified properties.
         * @param [properties] Properties to set
         * @returns GamepadOutput instance
         */
        public static create(properties?: CloudLark.IGamepadOutput): CloudLark.GamepadOutput;

        /**
         * Encodes the specified GamepadOutput message. Does not implicitly {@link CloudLark.GamepadOutput.verify|verify} messages.
         * @param message GamepadOutput message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: CloudLark.IGamepadOutput, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified GamepadOutput message, length delimited. Does not implicitly {@link CloudLark.GamepadOutput.verify|verify} messages.
         * @param message GamepadOutput message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: CloudLark.IGamepadOutput, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a GamepadOutput message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns GamepadOutput
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): CloudLark.GamepadOutput;

        /**
         * Decodes a GamepadOutput message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns GamepadOutput
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): CloudLark.GamepadOutput;

        /**
         * Verifies a GamepadOutput message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a GamepadOutput message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns GamepadOutput
         */
        public static fromObject(object: { [k: string]: any }): CloudLark.GamepadOutput;

        /**
         * Creates a plain object from a GamepadOutput message. Also converts values to other types if specified.
         * @param message GamepadOutput
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: CloudLark.GamepadOutput, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this GamepadOutput to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of an AppDataChannelState. */
    interface IAppDataChannelState {

        /** AppDataChannelState state */
        state?: (CloudLark.AppDataChannelState.State|null);
    }

    /** Represents an AppDataChannelState. */
    class AppDataChannelState implements IAppDataChannelState {

        /**
         * Constructs a new AppDataChannelState.
         * @param [properties] Properties to set
         */
        constructor(properties?: CloudLark.IAppDataChannelState);

        /** AppDataChannelState state. */
        public state: CloudLark.AppDataChannelState.State;

        /**
         * Creates a new AppDataChannelState instance using the specified properties.
         * @param [properties] Properties to set
         * @returns AppDataChannelState instance
         */
        public static create(properties?: CloudLark.IAppDataChannelState): CloudLark.AppDataChannelState;

        /**
         * Encodes the specified AppDataChannelState message. Does not implicitly {@link CloudLark.AppDataChannelState.verify|verify} messages.
         * @param message AppDataChannelState message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: CloudLark.IAppDataChannelState, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified AppDataChannelState message, length delimited. Does not implicitly {@link CloudLark.AppDataChannelState.verify|verify} messages.
         * @param message AppDataChannelState message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: CloudLark.IAppDataChannelState, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes an AppDataChannelState message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns AppDataChannelState
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): CloudLark.AppDataChannelState;

        /**
         * Decodes an AppDataChannelState message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns AppDataChannelState
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): CloudLark.AppDataChannelState;

        /**
         * Verifies an AppDataChannelState message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates an AppDataChannelState message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns AppDataChannelState
         */
        public static fromObject(object: { [k: string]: any }): CloudLark.AppDataChannelState;

        /**
         * Creates a plain object from an AppDataChannelState message. Also converts values to other types if specified.
         * @param message AppDataChannelState
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: CloudLark.AppDataChannelState, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this AppDataChannelState to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    namespace AppDataChannelState {

        /** State enum. */
        enum State {
            OPEN = 0,
            CLOSE = 1
        }
    }

    /** Properties of an AppDataChannelMessage. */
    interface IAppDataChannelMessage {

        /** AppDataChannelMessage type */
        type?: (CloudLark.AppDataChannelMessage.Type|null);

        /** AppDataChannelMessage data */
        data?: (Uint8Array|null);
    }

    /** Represents an AppDataChannelMessage. */
    class AppDataChannelMessage implements IAppDataChannelMessage {

        /**
         * Constructs a new AppDataChannelMessage.
         * @param [properties] Properties to set
         */
        constructor(properties?: CloudLark.IAppDataChannelMessage);

        /** AppDataChannelMessage type. */
        public type: CloudLark.AppDataChannelMessage.Type;

        /** AppDataChannelMessage data. */
        public data: Uint8Array;

        /**
         * Creates a new AppDataChannelMessage instance using the specified properties.
         * @param [properties] Properties to set
         * @returns AppDataChannelMessage instance
         */
        public static create(properties?: CloudLark.IAppDataChannelMessage): CloudLark.AppDataChannelMessage;

        /**
         * Encodes the specified AppDataChannelMessage message. Does not implicitly {@link CloudLark.AppDataChannelMessage.verify|verify} messages.
         * @param message AppDataChannelMessage message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: CloudLark.IAppDataChannelMessage, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified AppDataChannelMessage message, length delimited. Does not implicitly {@link CloudLark.AppDataChannelMessage.verify|verify} messages.
         * @param message AppDataChannelMessage message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: CloudLark.IAppDataChannelMessage, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes an AppDataChannelMessage message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns AppDataChannelMessage
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): CloudLark.AppDataChannelMessage;

        /**
         * Decodes an AppDataChannelMessage message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns AppDataChannelMessage
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): CloudLark.AppDataChannelMessage;

        /**
         * Verifies an AppDataChannelMessage message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates an AppDataChannelMessage message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns AppDataChannelMessage
         */
        public static fromObject(object: { [k: string]: any }): CloudLark.AppDataChannelMessage;

        /**
         * Creates a plain object from an AppDataChannelMessage message. Also converts values to other types if specified.
         * @param message AppDataChannelMessage
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: CloudLark.AppDataChannelMessage, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this AppDataChannelMessage to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    namespace AppDataChannelMessage {

        /** Type enum. */
        enum Type {
            STRING = 0,
            BIN = 1
        }
    }

    /** Properties of a SyncCursorStyle. */
    interface ISyncCursorStyle {

        /** SyncCursorStyle type */
        type?: (CloudLark.SyncCursorStyle.CursorType|null);

        /** SyncCursorStyle hotX */
        hotX?: (number|null);

        /** SyncCursorStyle hotY */
        hotY?: (number|null);

        /** SyncCursorStyle width */
        width?: (number|null);

        /** SyncCursorStyle height */
        height?: (number|null);

        /** SyncCursorStyle customBase64 */
        customBase64?: (string|null);
    }

    /** Represents a SyncCursorStyle. */
    class SyncCursorStyle implements ISyncCursorStyle {

        /**
         * Constructs a new SyncCursorStyle.
         * @param [properties] Properties to set
         */
        constructor(properties?: CloudLark.ISyncCursorStyle);

        /** SyncCursorStyle type. */
        public type: CloudLark.SyncCursorStyle.CursorType;

        /** SyncCursorStyle hotX. */
        public hotX: number;

        /** SyncCursorStyle hotY. */
        public hotY: number;

        /** SyncCursorStyle width. */
        public width: number;

        /** SyncCursorStyle height. */
        public height: number;

        /** SyncCursorStyle customBase64. */
        public customBase64: string;

        /**
         * Creates a new SyncCursorStyle instance using the specified properties.
         * @param [properties] Properties to set
         * @returns SyncCursorStyle instance
         */
        public static create(properties?: CloudLark.ISyncCursorStyle): CloudLark.SyncCursorStyle;

        /**
         * Encodes the specified SyncCursorStyle message. Does not implicitly {@link CloudLark.SyncCursorStyle.verify|verify} messages.
         * @param message SyncCursorStyle message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: CloudLark.ISyncCursorStyle, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified SyncCursorStyle message, length delimited. Does not implicitly {@link CloudLark.SyncCursorStyle.verify|verify} messages.
         * @param message SyncCursorStyle message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: CloudLark.ISyncCursorStyle, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a SyncCursorStyle message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns SyncCursorStyle
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): CloudLark.SyncCursorStyle;

        /**
         * Decodes a SyncCursorStyle message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns SyncCursorStyle
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): CloudLark.SyncCursorStyle;

        /**
         * Verifies a SyncCursorStyle message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a SyncCursorStyle message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns SyncCursorStyle
         */
        public static fromObject(object: { [k: string]: any }): CloudLark.SyncCursorStyle;

        /**
         * Creates a plain object from a SyncCursorStyle message. Also converts values to other types if specified.
         * @param message SyncCursorStyle
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: CloudLark.SyncCursorStyle, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this SyncCursorStyle to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    namespace SyncCursorStyle {

        /** CursorType enum. */
        enum CursorType {
            ARROW = 0,
            IBEAM = 1,
            WAIT = 2,
            CROSS = 3,
            SIZENWSE = 4,
            SIZENESW = 5,
            SIZEWE = 6,
            SIZENS = 7,
            SIZEALL = 8,
            NO = 9,
            HAND = 10,
            CUSTOM = 11
        }
    }

    /** Properties of a ClientInput. */
    interface IClientInput {

        /** ClientInput mouseMove */
        mouseMove?: (CloudLark.IMouseMove|null);

        /** ClientInput mouseDown */
        mouseDown?: (CloudLark.IMouseDown|null);

        /** ClientInput mouseUp */
        mouseUp?: (CloudLark.IMouseUp|null);

        /** ClientInput mouseWheel */
        mouseWheel?: (CloudLark.IMouseWheel|null);

        /** ClientInput keyDown */
        keyDown?: (CloudLark.IKeyDown|null);

        /** ClientInput keyUp */
        keyUp?: (CloudLark.IKeyUp|null);

        /** ClientInput clientEnter */
        clientEnter?: (CloudLark.IClientEnter|null);

        /** ClientInput clientLeave */
        clientLeave?: (CloudLark.IClientLeave|null);

        /** ClientInput dispatchController */
        dispatchController?: (CloudLark.IDispatchController|null);

        /** ClientInput requesController */
        requesController?: (CloudLark.IRequestController|null);

        /** ClientInput textInput */
        textInput?: (CloudLark.ITextInput|null);

        /** ClientInput gamepadInputJoystickStates */
        gamepadInputJoystickStates?: (CloudLark.IGamepadInputJoyStickStates|null);

        /** ClientInput gamepadInputButtonDown */
        gamepadInputButtonDown?: (CloudLark.IGamepadInputButtonDown|null);

        /** ClientInput gamepadInputButtonUp */
        gamepadInputButtonUp?: (CloudLark.IGamepadInputButtonUp|null);

        /** ClientInput gamepadInputTriger */
        gamepadInputTriger?: (CloudLark.IGamepadInputTriger|null);

        /** ClientInput clientDcMsg */
        clientDcMsg?: (CloudLark.IAppDataChannelMessage|null);

        /** ClientInput touchMove */
        touchMove?: (CloudLark.ITouchMove|null);

        /** ClientInput touchDown */
        touchDown?: (CloudLark.ITouchDown|null);

        /** ClientInput touchUp */
        touchUp?: (CloudLark.ITouchUp|null);
    }

    /** Represents a ClientInput. */
    class ClientInput implements IClientInput {

        /**
         * Constructs a new ClientInput.
         * @param [properties] Properties to set
         */
        constructor(properties?: CloudLark.IClientInput);

        /** ClientInput mouseMove. */
        public mouseMove?: (CloudLark.IMouseMove|null);

        /** ClientInput mouseDown. */
        public mouseDown?: (CloudLark.IMouseDown|null);

        /** ClientInput mouseUp. */
        public mouseUp?: (CloudLark.IMouseUp|null);

        /** ClientInput mouseWheel. */
        public mouseWheel?: (CloudLark.IMouseWheel|null);

        /** ClientInput keyDown. */
        public keyDown?: (CloudLark.IKeyDown|null);

        /** ClientInput keyUp. */
        public keyUp?: (CloudLark.IKeyUp|null);

        /** ClientInput clientEnter. */
        public clientEnter?: (CloudLark.IClientEnter|null);

        /** ClientInput clientLeave. */
        public clientLeave?: (CloudLark.IClientLeave|null);

        /** ClientInput dispatchController. */
        public dispatchController?: (CloudLark.IDispatchController|null);

        /** ClientInput requesController. */
        public requesController?: (CloudLark.IRequestController|null);

        /** ClientInput textInput. */
        public textInput?: (CloudLark.ITextInput|null);

        /** ClientInput gamepadInputJoystickStates. */
        public gamepadInputJoystickStates?: (CloudLark.IGamepadInputJoyStickStates|null);

        /** ClientInput gamepadInputButtonDown. */
        public gamepadInputButtonDown?: (CloudLark.IGamepadInputButtonDown|null);

        /** ClientInput gamepadInputButtonUp. */
        public gamepadInputButtonUp?: (CloudLark.IGamepadInputButtonUp|null);

        /** ClientInput gamepadInputTriger. */
        public gamepadInputTriger?: (CloudLark.IGamepadInputTriger|null);

        /** ClientInput clientDcMsg. */
        public clientDcMsg?: (CloudLark.IAppDataChannelMessage|null);

        /** ClientInput touchMove. */
        public touchMove?: (CloudLark.ITouchMove|null);

        /** ClientInput touchDown. */
        public touchDown?: (CloudLark.ITouchDown|null);

        /** ClientInput touchUp. */
        public touchUp?: (CloudLark.ITouchUp|null);

        /** ClientInput input. */
        public input?: ("mouseMove"|"mouseDown"|"mouseUp"|"mouseWheel"|"keyDown"|"keyUp"|"clientEnter"|"clientLeave"|"dispatchController"|"requesController"|"textInput"|"gamepadInputJoystickStates"|"gamepadInputButtonDown"|"gamepadInputButtonUp"|"gamepadInputTriger"|"clientDcMsg"|"touchMove"|"touchDown"|"touchUp");

        /**
         * Creates a new ClientInput instance using the specified properties.
         * @param [properties] Properties to set
         * @returns ClientInput instance
         */
        public static create(properties?: CloudLark.IClientInput): CloudLark.ClientInput;

        /**
         * Encodes the specified ClientInput message. Does not implicitly {@link CloudLark.ClientInput.verify|verify} messages.
         * @param message ClientInput message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: CloudLark.IClientInput, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified ClientInput message, length delimited. Does not implicitly {@link CloudLark.ClientInput.verify|verify} messages.
         * @param message ClientInput message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: CloudLark.IClientInput, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a ClientInput message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns ClientInput
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): CloudLark.ClientInput;

        /**
         * Decodes a ClientInput message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns ClientInput
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): CloudLark.ClientInput;

        /**
         * Verifies a ClientInput message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a ClientInput message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns ClientInput
         */
        public static fromObject(object: { [k: string]: any }): CloudLark.ClientInput;

        /**
         * Creates a plain object from a ClientInput message. Also converts values to other types if specified.
         * @param message ClientInput
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: CloudLark.ClientInput, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this ClientInput to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of an AppNotification. */
    interface IAppNotification {

        /** AppNotification resize */
        resize?: (CloudLark.IAppResize|null);

        /** AppNotification mousemode */
        mousemode?: (CloudLark.IAppMouseMode|null);

        /** AppNotification updatePlayers */
        updatePlayers?: (CloudLark.IUpdatePlayersDesc|null);

        /** AppNotification requestInput */
        requestInput?: (CloudLark.IAppRequestInput|null);

        /** AppNotification gamepadOutput */
        gamepadOutput?: (CloudLark.IGamepadOutput|null);

        /** AppNotification datachannelState */
        datachannelState?: (CloudLark.IAppDataChannelState|null);

        /** AppNotification appDcMsg */
        appDcMsg?: (CloudLark.IAppDataChannelMessage|null);

        /** AppNotification cursorStyle */
        cursorStyle?: (CloudLark.ISyncCursorStyle|null);
    }

    /** Represents an AppNotification. */
    class AppNotification implements IAppNotification {

        /**
         * Constructs a new AppNotification.
         * @param [properties] Properties to set
         */
        constructor(properties?: CloudLark.IAppNotification);

        /** AppNotification resize. */
        public resize?: (CloudLark.IAppResize|null);

        /** AppNotification mousemode. */
        public mousemode?: (CloudLark.IAppMouseMode|null);

        /** AppNotification updatePlayers. */
        public updatePlayers?: (CloudLark.IUpdatePlayersDesc|null);

        /** AppNotification requestInput. */
        public requestInput?: (CloudLark.IAppRequestInput|null);

        /** AppNotification gamepadOutput. */
        public gamepadOutput?: (CloudLark.IGamepadOutput|null);

        /** AppNotification datachannelState. */
        public datachannelState?: (CloudLark.IAppDataChannelState|null);

        /** AppNotification appDcMsg. */
        public appDcMsg?: (CloudLark.IAppDataChannelMessage|null);

        /** AppNotification cursorStyle. */
        public cursorStyle?: (CloudLark.ISyncCursorStyle|null);

        /** AppNotification notify. */
        public notify?: ("resize"|"mousemode"|"updatePlayers"|"requestInput"|"gamepadOutput"|"datachannelState"|"appDcMsg"|"cursorStyle");

        /**
         * Creates a new AppNotification instance using the specified properties.
         * @param [properties] Properties to set
         * @returns AppNotification instance
         */
        public static create(properties?: CloudLark.IAppNotification): CloudLark.AppNotification;

        /**
         * Encodes the specified AppNotification message. Does not implicitly {@link CloudLark.AppNotification.verify|verify} messages.
         * @param message AppNotification message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: CloudLark.IAppNotification, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified AppNotification message, length delimited. Does not implicitly {@link CloudLark.AppNotification.verify|verify} messages.
         * @param message AppNotification message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: CloudLark.IAppNotification, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes an AppNotification message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns AppNotification
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): CloudLark.AppNotification;

        /**
         * Decodes an AppNotification message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns AppNotification
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): CloudLark.AppNotification;

        /**
         * Verifies an AppNotification message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates an AppNotification message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns AppNotification
         */
        public static fromObject(object: { [k: string]: any }): CloudLark.AppNotification;

        /**
         * Creates a plain object from an AppNotification message. Also converts values to other types if specified.
         * @param message AppNotification
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: CloudLark.AppNotification, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this AppNotification to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }
}
