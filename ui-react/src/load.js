import Log from './utils/log';
import Unit from './utils/unit';
import Config from './config';

export default class Load {
	// start appinfo 需要的参数
	/**
	 * appid
	 */
	static get appliId() { return this._appliId; }
	static _appliId = "";

	static get endDate() { return this._endDate; }
	static _endDate = "";

	static get clientMac() { return this._clientMac; }
	static _clientMac = "";

	/**
	 * appKey
	 */
	static get appKey() { return this._appKey; }
	static _appKey = "";

	// group id
	static get groupId() { return this._groupId; }
	static _groupId = "";

	static get regionId() { return this._regionId; }
	static _regionId = "";

	static get timeStamp() { return this._timeStamp; }
	static _timeStamp = "";

	static get signature() { return this._signature; }
	static _signature = "";

	//指定节点分配
	static get targetServerIp() { return this._targetServerIp; }
	static _targetServerIp = "";

	/**
	 * taskid
	 */
	static get taskid() { return this._taskid; }
	static _taskid = '';

	/**
	 * language
	 */
	static get language() { return this._language; }
	static _language = '';

	/**
	 * @deprecated
	 * 应用的宽高。现在云端自动获取宽高
	 */
	static get width() { return this._width; }
	static _width = Config.OriginW;

	/**
	 * @deprecated
	 * 应用的宽高。现在云端自动获取宽高
	 */
	static get height() { return this._height; }
	static _height = Config.OriginH;


	/**
	 * 码率. 用在在创建 webrtc sdp时替换为此码率。
	 */
	static get codeRate() { return this._codeRate; }
	static _codeRate = 5000;


	/**
	 * audio code rate
	 * https://stackoverflow.com/questions/33649283/how-to-set-up-sdp-for-high-quality-opus-audio
	 * a=fmtp:111 minptime=10;useinbandfec=1; stereo=1; maxaveragebitrate=510000
	 */
	static get audioCodeRate() { return this._audioCodeRate; }
	static _audioCodeRate = 128;

	/**
	 * 帧率，在登录task时传给后端。
	 */
	static get frameRate() { return this._frameRate; }
	static _frameRate = 30;


	// 一人操作多人看相关
	/**
	 * 一人操作多人看 0 普通模式 1 交互模式（可以一人操作多人看）
	 * 2 多人互动模式，鼠标键盘都放开
	 */
	static get playerMode() { return this._playerMode; }
	static _playerMode = 0;

	/**
	 * 用户类型 number
	 * 所有者:1  观察者:0;
	 */
	static get userType() { return this._userType; }
	static _userType = 1;

	/**
	 * 用户昵称
	 */
	static get nickname() { return this._nickname; }
	static _nickname = "";

	/**
	 * 口令:8位唯一码,写入TaskInfo. 房间code，备用。
	 */
	static get roomCode() { return this._roomCode; }
	static _roomCode = "";

	/**
	 * 口令：8位唯一码 从roomCode改为authCode
	 */
	static get authCode() { return this._authCode; }
	static _authCode = "";

	/**
	 * 应用类型 accessType: 0私有应用
	 */
	static get accessType() { return this._accessType; }
	static _accessType = "";
	/**
	 * shareId
	 */
	static get shareId() { return this._shareId; }
	static _shareId = "";

	// start appinfo 如下参数不会返回结果
	/**
	 * 日志级别
	 * @default 'info'
	 */
	static get logLevel() { return this._logLevel; }
	static _logLevel = 'info';

	/**
	 * debug task. 跳过task检测
	 */
	static get debugTask() { return this._debugTask; }
	static _debugTask = false;

	/**
	 * debug webserver
	 */
	static get debugWebServer() {return this._debugWebServer; }
	static _debugWebServer = '';

	/**
	 * laoding timeout
	 */
	static get loadingTimeoutMs() { return this._loadingTimeout * 1000; }
	static get loadingTimeout() { return this._loadingTimeout; }
	static _loadingTimeout = 5 * 60;

	/**
 	* 优先使用的解码器 'auto' | 'vp8' | 'vp9' | 'h264' | 'av1x' | 'hevc' |'h265' | 'svac'
 	*/
	static get preferDecoder() { return this._perferDecoder; }
	static _perferDecoder = 'h264'

	/**
	 *
	 */
	static get syncLocalToCloudClipboard() { return this._syncLocalToCloudClipboard; }
	static _syncLocalToCloudClipboard = true;

	// 是否显示 rtt 图标
	static get enableRttIcon() { return this._enableRttIcon; }
	static _enableRttIcon =  true;
	// 是否显示声音提示
	static get enableSoundRequire() { return this._enableSoundRequire; }
	static _enableSoundRequire = true;

	// 只显示大于 level 的 toast
	// 例如: toastLevel = 0, 显示所有toast
	// toastLevel > 2 || toastLevel < 0, 关闭所有 toast
	static get toastLevel() { return this._toastLevel; }
	static _toastLevel = 0;

	// 通过 url 方式进入应用
	// 通过 url 方式必须要有  appserver， appport， taskid
	/**
	 * appserver 的ip地址
	 */
	static get appServer() { return this._appServer; }
	static _appServer = '';

	/**
	 * appserver 的端口号
	 */
	static get appPort() { return this._appPort; }
	static _appPort = '';

	static get preferPublicIp() { return this._preferPublicIp; }
	static _preferPublicIp = "";

	static get mutePlayWhenFailed() { return this._mutePlayWhenFiled; }
	static _mutePlayWhenFiled = true;

	static get extraparams() { return this._extraparams}
	static _extraparams = {};

	// 从url载入参数。返回是否已经启动task.
	static InitProcess() {
		Load._appliId = Load.getStringOption(Unit.queryString('appliId'), '');
		Load._appServer = Unit.queryString('renderServerIp');
		Load._appPort = Unit.queryString('renderServerPort');
		Load._taskid = Load.getStringOption(Unit.queryString('taskId'), "");
		this._language = Unit.queryString('language');
		Load._extraparams = Unit.queryExtraparam();

		Load._groupId = Load.getStringOption(Unit.queryString('groupId'), "");
		Load._regionId = Load.getStringOption(Unit.queryString('regionId'), "");
		Load._targetServerIp = Load.getStringOption(Unit.queryString('targetServerIp'), "");
		Load._timeStamp = Load.getStringOption(Unit.queryString("timeStamp"), "");
		Load._signature = Load.getStringOption(Unit.queryString("signature"), "");
		Load._appKey  = Load.getStringOption(Unit.queryString('appKey'), "");
		Load._endDate = Load.getStringOption(Unit.queryString('endDate'), "");
		Load._clientMac = Load.getStringOption(Unit.queryString('clientMac'), '');

		// option
		Load._codeRate = Load.getIntOption(Unit.queryString('codeRate'), Config.CodeRate);
		Load._frameRate = Load.getIntOption(Unit.queryString('frameRate'), Config.FrameRate);
		Load._width = Load.getIntOption(Unit.queryString('width'), Config.OriginW);
		Load._height = Load.getIntOption(Unit.queryString('height'), Config.OriginH);

		// loglevel
		Load._logLevel = Load.getLogLevel(Unit.queryString('logLevel'));
		//this._logLevel = 'info';
		Load._debugTask = Load.getBoolOption(Unit.queryString('debugTask'));
		Load._wsProxy = Load.getNumberBoolOption(Unit.queryString('wsProxy'));
		// debug ip
		Load._debugWebServer = decodeURIComponent(decodeURIComponent(Unit.queryString('debugWebServer')));

		// 一人操作多人看
		Load._playerMode = Load.getIntOption(Unit.queryString('playerMode'),  0);
		Load._userType = Load.getIntOption(Unit.queryString('userType'), 1);
		Load._nickname = Load.getStringOption(Unit.queryString('nickname'));
		Load._roomCode = Load.getStringOption(Unit.queryString('roomCode'), "");
		Load._authCode = Load.getStringOption(Unit.queryString('authCode'), "");
		Load._accessType = Load.getStringOption(Unit.queryString('accessType'), "");
		Load._shareId = Load.getStringOption(Unit.queryString('shareId'), "");

		Load._loadingTimeout = Load.getIntOption(Unit.queryString('loadingTimeout'), 5 * 60);

		Load._perferDecoder = Load.getStringOption(Unit.queryString('preferDecoder'), 'h264');

		Load._syncLocalToCloudClipboard = Load.getBoolOption(Unit.queryString('syncLocalToCloudClipboard'), true);


		Load._enableRttIcon = Load.getBoolOption(Unit.queryString('enableRttIcon'), true);
		Load._enableSoundRequire = Load.getBoolOption(Unit.queryString('enableSoundRequire'), true);
		Load._toastLevel = Load.getIntOption(Unit.queryString('toastLevel'), 0);

		Load._audioCodeRate = Load.getIntOption(Unit.queryString('audioCodeRate'), 128);

		Load._preferPublicIp = Load.getStringOption(Unit.queryString('preferPublicIp'), '');

		Load._mutePlayWhenFiled = Load.getBoolOption(Unit.queryString('mutePlayWhenFailed'), true);

		Log.info("一人操作多人看" +
			" player mode " + Load.playerMode +
			" userType " + Load.userType +
			" nickname " + Load.nickname +
			" roomCode " + Load.roomCode +
			" authCode " + Load.authCode);

		Log.info('code rate:' + Load.codeRate + Unit.queryString('codeRate'));
		Log.info('frame rate:' + Load.frameRate + Unit.queryString('frameRate'));
		// Log.info('forceIceAddr', this._forceIceAddr);
		Log.info('width:' + Load._width);
		Log.info('height:' + Load._height);

		Log.info('perfer decoder ' + Load._perferDecoder);

		// 返回是否通过 url 方式进入应用。
		// 已经调用好进入应用接口
		return Load.appServer && Load.appPort && Load.taskid;
	}

	static getLogLevel(level) {
		if ((level && level === 'info') || level === 'warn') {
			return level;
		} else {
			return 'warn';
		}
	}
	static getBoolOption(option, emptyValue) {
		if (option === null || option === undefined || option === '') {
			return emptyValue;
		}
		if (typeof option === 'boolean') {
			return option;
		}
		return option !== 'false';
	}
	static getNumberBoolOption(option, emptyValue = false) {
		if (option === null || option === undefined || option === '') {
			return emptyValue;
		}
		if (typeof option === 'number') {
			return option !== 0;
		}

		return option !== "0";
	}
	static getStringOption(option, emptyValue = "") {
		if (option === null || option === undefined || option === '') {
			return emptyValue;
		}
		if (option === 'null') {
			return emptyValue;
		}
		return decodeURI(decodeURI(option));
	}
	static getIntOption(option, emptyValue = 0) {
		if (option === null || option === undefined || option === '') {
			return emptyValue;
		}
		const res = parseInt(option, 10);
		if (isNaN(res)) {
			return emptyValue;
		}
		return res;
	}
	static getBgColor(option) {
		if (option === null || option === undefined || option === '') {
			return '';
		}
		if (option.indexOf('0x') > -1) {
			return option.replace('0x', '#');
		}
		return "#" + option;
	}
}
