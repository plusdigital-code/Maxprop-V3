Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default=function(ctx) {
var __t, __p = '', __j = Array.prototype.join;
function print() { __p += __j.call(arguments, '') }

 if (!ctx.node.isRoot) { ;
__p += '\n  <div class="list-group-item">\n';
 } else { ;
__p += '\n  <li class="list-group-item">\n';
 } ;
__p += '\n    <div class="node-edit">\n      <div node-edit-form></div>\n      ';
 if (!ctx.instance.options.readOnly) { ;
__p += '\n      <div class="node-actions">\n        <button class="btn btn-primary saveNode">Save</button>\n        <button class="btn btn-danger cancelNode">Cancel</button>\n      </div>\n      ';
 } ;
__p += '\n    </div>\n';
 if (!ctx.node.isRoot) { ;
__p += '\n  </div>\n';
 } else { ;
__p += '\n  </li>\n';
 } ;
__p += '\n';
return __p
}