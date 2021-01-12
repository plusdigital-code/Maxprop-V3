Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default=function(ctx) {
var __t, __p = '', __j = Array.prototype.join;
function print() { __p += __j.call(arguments, '') }

 if (ctx.node.isRoot) { ;
__p += '\n  <div class="list-group-item"></div>\n';
 } else { ;
__p += '\n  <li class="list-group-item col-sm-12"></li>\n';
 } ;
__p += '\n';
return __p
}