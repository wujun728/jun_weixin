'use strict';

var _wepy = require('./../npm/wepy/lib/wepy.js');

var _wepy2 = _interopRequireDefault(_wepy);

var _util = require('./util.js');

var _util2 = _interopRequireDefault(_util);

var _md = require('./md5.js');

var _md2 = _interopRequireDefault(_md);

var _tip = require('./tip.js');

var _tip2 = _interopRequireDefault(_tip);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var API_SECRET_KEY = '372E839C53FCAED6F72780372E839C53FC47B1912B6C47B1912B6CAED6F72780';
var TIMESTAMP = _util2.default.getCurrentTime();
var MAIN_ID = 'ff80808158004a720158005cc83f000b';
var SIGN = _md2.default.hex_md5((TIMESTAMP + API_SECRET_KEY + MAIN_ID).toLowerCase());

var wxRequest = function () {
    var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
        var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
        var url = arguments[1];
        var data, res;
        return regeneratorRuntime.wrap(function _callee$(_context) {
            while (1) {
                switch (_context.prev = _context.next) {
                    case 0:
                        _tip2.default.loading();
                        data = params.query || {};

                        data.sign = SIGN;
                        data.time = TIMESTAMP;
                        data.mainId = MAIN_ID;
                        _context.next = 7;
                        return _wepy2.default.request({
                            url: url,
                            method: params.method || 'GET',
                            data: data,
                            header: { 'Content-Type': 'application/json' }
                        });

                    case 7:
                        res = _context.sent;

                        _tip2.default.loaded();
                        return _context.abrupt('return', res);

                    case 10:
                    case 'end':
                        return _context.stop();
                }
            }
        }, _callee, undefined);
    }));

    return function wxRequest() {
        return _ref.apply(this, arguments);
    };
}();

module.exports = {
    wxRequest: wxRequest
};
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInd4UmVxdWVzdC5qcyJdLCJuYW1lcyI6WyJBUElfU0VDUkVUX0tFWSIsIlRJTUVTVEFNUCIsInV0aWwiLCJnZXRDdXJyZW50VGltZSIsIk1BSU5fSUQiLCJTSUdOIiwibWQ1IiwiaGV4X21kNSIsInRvTG93ZXJDYXNlIiwid3hSZXF1ZXN0IiwicGFyYW1zIiwidXJsIiwidGlwIiwibG9hZGluZyIsImRhdGEiLCJxdWVyeSIsInNpZ24iLCJ0aW1lIiwibWFpbklkIiwid2VweSIsInJlcXVlc3QiLCJtZXRob2QiLCJoZWFkZXIiLCJyZXMiLCJsb2FkZWQiLCJtb2R1bGUiLCJleHBvcnRzIl0sIm1hcHBpbmdzIjoiOztBQUFBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7Ozs7OztBQUVBLElBQU1BLGlCQUFpQixrRUFBdkI7QUFDQSxJQUFNQyxZQUFZQyxlQUFLQyxjQUFMLEVBQWxCO0FBQ0EsSUFBTUMsVUFBVSxrQ0FBaEI7QUFDQSxJQUFNQyxPQUFPQyxhQUFJQyxPQUFKLENBQVksQ0FBQ04sWUFBWUQsY0FBWixHQUEyQkksT0FBNUIsRUFBcUNJLFdBQXJDLEVBQVosQ0FBYjs7QUFFQSxJQUFNQztBQUFBLHVFQUFZO0FBQUEsWUFBTUMsTUFBTix1RUFBZSxFQUFmO0FBQUEsWUFBbUJDLEdBQW5CO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUNkQyxzQ0FBSUMsT0FBSjtBQUNJQyw0QkFGVSxHQUVISixPQUFPSyxLQUFQLElBQWdCLEVBRmI7O0FBR2RELDZCQUFLRSxJQUFMLEdBQVlYLElBQVo7QUFDQVMsNkJBQUtHLElBQUwsR0FBWWhCLFNBQVo7QUFDQWEsNkJBQUtJLE1BQUwsR0FBY2QsT0FBZDtBQUxjO0FBQUEsK0JBTUVlLGVBQUtDLE9BQUwsQ0FBYTtBQUN6QlQsaUNBQUtBLEdBRG9CO0FBRXpCVSxvQ0FBUVgsT0FBT1csTUFBUCxJQUFpQixLQUZBO0FBR3pCUCxrQ0FBTUEsSUFIbUI7QUFJekJRLG9DQUFRLEVBQUUsZ0JBQWdCLGtCQUFsQjtBQUppQix5QkFBYixDQU5GOztBQUFBO0FBTVZDLDJCQU5VOztBQVlkWCxzQ0FBSVksTUFBSjtBQVpjLHlEQWFQRCxHQWJPOztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLEtBQVo7O0FBQUE7QUFBQTtBQUFBO0FBQUEsR0FBTjs7QUFpQkFFLE9BQU9DLE9BQVAsR0FBaUI7QUFDYmpCO0FBRGEsQ0FBakIiLCJmaWxlIjoid3hSZXF1ZXN0LmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHdlcHkgZnJvbSAnd2VweSc7XG5pbXBvcnQgdXRpbCBmcm9tICcuL3V0aWwnO1xuaW1wb3J0IG1kNSBmcm9tICcuL21kNSc7XG5pbXBvcnQgdGlwIGZyb20gJy4vdGlwJ1xuXG5jb25zdCBBUElfU0VDUkVUX0tFWSA9ICczNzJFODM5QzUzRkNBRUQ2RjcyNzgwMzcyRTgzOUM1M0ZDNDdCMTkxMkI2QzQ3QjE5MTJCNkNBRUQ2RjcyNzgwJ1xuY29uc3QgVElNRVNUQU1QID0gdXRpbC5nZXRDdXJyZW50VGltZSgpXG5jb25zdCBNQUlOX0lEID0gJ2ZmODA4MDgxNTgwMDRhNzIwMTU4MDA1Y2M4M2YwMDBiJ1xuY29uc3QgU0lHTiA9IG1kNS5oZXhfbWQ1KChUSU1FU1RBTVAgKyBBUElfU0VDUkVUX0tFWStNQUlOX0lEKS50b0xvd2VyQ2FzZSgpKVxuXG5jb25zdCB3eFJlcXVlc3QgPSBhc3luYyhwYXJhbXMgPSB7fSwgdXJsKSA9PiB7XG4gICAgdGlwLmxvYWRpbmcoKTtcbiAgICBsZXQgZGF0YSA9IHBhcmFtcy5xdWVyeSB8fCB7fTtcbiAgICBkYXRhLnNpZ24gPSBTSUdOO1xuICAgIGRhdGEudGltZSA9IFRJTUVTVEFNUDtcbiAgICBkYXRhLm1haW5JZCA9IE1BSU5fSUQ7XG4gICAgbGV0IHJlcyA9IGF3YWl0IHdlcHkucmVxdWVzdCh7XG4gICAgICAgIHVybDogdXJsLFxuICAgICAgICBtZXRob2Q6IHBhcmFtcy5tZXRob2QgfHwgJ0dFVCcsXG4gICAgICAgIGRhdGE6IGRhdGEsXG4gICAgICAgIGhlYWRlcjogeyAnQ29udGVudC1UeXBlJzogJ2FwcGxpY2F0aW9uL2pzb24nIH0sXG4gICAgfSk7XG4gICAgdGlwLmxvYWRlZCgpO1xuICAgIHJldHVybiByZXM7XG59O1xuXG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICAgIHd4UmVxdWVzdFxufVxuIl19