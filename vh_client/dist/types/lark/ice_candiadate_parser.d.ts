export default class IceCandidateParser {
    sdpMLineIndex: number | null;
    sdpMid: string | null;
    usernameFragment: string | null;
    header: string;
    private props;
    constructor(ice: RTCIceCandidateInit);
    get foundation(): string;
    set foundation(f: string);
    get component(): string;
    set component(f: string);
    get protocol(): string;
    set protocol(p: string);
    get priority(): string;
    set priority(p: string);
    get ip(): string;
    set ip(ip: string);
    get port(): string;
    set port(port: string);
    get type(): string;
    get candidate(): string;
    genNewIceCandidateInit(): RTCIceCandidateInit;
    genNewIceCandidate(): RTCIceCandidate;
}
