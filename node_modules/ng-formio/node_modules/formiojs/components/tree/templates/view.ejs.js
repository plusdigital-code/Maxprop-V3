Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default=function(ctx) {
var __t, __p = '', __j = Array.prototype.join;
function print() { __p += __j.call(arguments, '') }
__p += '<div class="row">\n  ';
 ctx.util.eachComponent(ctx.components, function(component) { ;
__p += '\n    <div class="col-sm-2">\n      ' +
((__t = ( ctx.getView(component, ctx.nodeData[component.key]) )) == null ? '' : __t) +
'\n    </div>\n  ';
 }) ;
__p += '\n  <div class="col-sm-3">\n    <div class="btn-group pull-right">\n      <button class="btn btn-default btn-sm toggleNode">' +
((__t = ( ctx.collapseText(node) )) == null ? '' : __t) +
'</button>\n      ';
 if (!ctx.instance.options.readOnly) { ;
__p += '\n        <button class="btn btn-default btn-sm addChild">Add</button>\n        <button class="btn btn-default btn-sm editNode">Edit</button>\n        <button class="btn btn-danger btn-sm removeNode">Delete</button>\n        ';
 if (ctx.node.revertAvailable) { ;
__p += '\n          <button class="btn btn-danger btn-sm revertNode">Revert</button>\n        ';
 } ;
__p += '\n      ';
 } ;
__p += '\n    </div>\n  </div>\n</div>\n';
return __p
}