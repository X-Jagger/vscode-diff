// tslint:disable
export default {
	"l13-diff-actions/l13-diff-actions.css": ":host{cursor:default;display:block;text-align:center;user-select:none}:host>button{background:transparent;border:0;height:21px;margin:0 5px 0 5px;padding:0 0 0 0;position:relative;width:21px}:host>button::before{content:'';height:100%;left:0;background:var(--vscode-foreground);-webkit-mask-position:50% 50%;mask-position:50% 50%;-webkit-mask-repeat:no-repeat;mask-repeat:no-repeat;position:absolute;top:0;width:100%}:host>button:focus{outline:solid 1px var(--vscode-focusBorder, transparent)}:host>button:hover{cursor:pointer}:host>button:hover::before{background:var(--vscode-button-hoverBackground)}:host>button[disabled]{opacity:0.3;cursor:default}:host>button[disabled]:hover::before{background:var(--vscode-foreground) !important}:host>button#l13_copy_left{width:42px}:host>button#l13_copy_left::before{-webkit-mask-image:url(\"copy-left.svg\");mask-image:url(\"copy-left.svg\")}:host>button#l13_select_deleted::before{-webkit-mask-image:url(\"select-deleted.svg\");mask-image:url(\"select-deleted.svg\")}:host>button#l13_select_deleted:hover::before{background:var(--vscode-gitDecoration-deletedResourceForeground)}:host>button#l13_select_modified::before{-webkit-mask-image:url(\"select-modified.svg\");mask-image:url(\"select-modified.svg\")}:host>button#l13_select_modified:hover::before{background:var(--vscode-gitDecoration-modifiedResourceForeground)}:host>button#l13_select_untracked::before{-webkit-mask-image:url(\"select-untracked.svg\");mask-image:url(\"select-untracked.svg\")}:host>button#l13_select_untracked:hover::before{background:var(--vscode-gitDecoration-untrackedResourceForeground)}:host>button#l13_copy_right{width:42px}:host>button#l13_copy_right::before{-webkit-mask-image:url(\"copy-right.svg\");mask-image:url(\"copy-right.svg\")}\n",
	"l13-diff-compare/l13-diff-compare.css": ":host{display:block;padding-right:10px;text-align:right;user-select:none}button{background:var(--vscode-button-background);box-sizing:border-box;border:none;color:var(--vscode-button-foreground);cursor:pointer;font-size:0.8125rem;padding:2px 14px 3px 14px;position:relative;z-index:1}button:hover{background:var(--vscode-button-hoverBackground)}button[disabled]{opacity:0.3;cursor:default}button[disabled]:hover{background:var(--vscode-button-background) !important}\n",
	"l13-diff-input/l13-diff-input.css": ":host{position:relative;user-select:none}:host>input{background:var(--vscode-input-background);border:none;box-sizing:border-box;color:var(--vscode-input-foreground);display:block;font-size:0.8125rem;outline:solid 1px var(--vscode-input-border, transparent);outline-offset:-1px;padding:4px 35px 5px 7px;width:100%;z-index:0}:host>input::selection{background:var(--vscode-selection-background, var(--l13-selection-background))}:host>input:focus{outline-color:var(--vscode-focusBorder, transparent)}:host>input.-error{outline-color:var(--vscode-inputValidation-errorBorder, #c00)}:host>button{background:transparent;border:0;cursor:pointer;height:18px;margin-top:-10px;padding:0 0 0 0;position:absolute;right:7px;top:50%;width:21px}:host>button::before{background:var(--vscode-foreground);content:'';height:100%;left:0;-webkit-mask-image:url(\"folder.svg\");mask-image:url(\"folder.svg\");-webkit-mask-position:50% 50%;mask-position:50% 50%;-webkit-mask-repeat:no-repeat;mask-repeat:no-repeat;position:absolute;top:0;width:100%}:host>button:focus{outline:solid 1px var(--vscode-focusBorder, transparent)}:host>button:hover::before{background:var(--vscode-button-hoverBackground)}:host>button[disabled]{opacity:0.3;cursor:default}:host>button[disabled]:hover::before{background:var(--vscode-foreground) !important}\n",
	"l13-diff-list/l13-diff-list.css": ":host{display:block;overflow:auto;margin:0 0 0 0;user-select:none}l13-diff-list-body{display:block;width:100%}l13-diff-list-body.-focus l13-diff-list-row.-selected{background:var(--vscode-list-activeSelectionBackground);color:var(--vscode-list-activeSelectionForeground)}l13-diff-list-body.-focus l13-diff-list-row.-selected l13-diff-list-file::before{background:var(--vscode-list-activeSelectionForeground)}l13-diff-list-row{display:flex;width:100%}l13-diff-list-row:hover{background:var(--vscode-list-hoverBackground);color:var(--vscode-list-hoverForeground)}l13-diff-list-row.-selected{background:var(--vscode-list-inactiveSelectionBackground);color:var(--vscode-list-inactiveSelectionForeground)}l13-diff-list-row.-selected l13-diff-list-file::before{background:var(--vscode-list-inactiveSelectionForeground, var(--vscode-foreground))}l13-diff-list-row.-deleted{color:var(--vscode-gitDecoration-deletedResourceForeground)}l13-diff-list-row.-modified{color:var(--vscode-gitDecoration-modifiedResourceForeground)}l13-diff-list-row.-untracked{color:var(--vscode-gitDecoration-untrackedResourceForeground)}l13-diff-list-row.-error{background:var(--vscode-list-errorForeground);color:#ffffff}l13-diff-list-row.-error l13-diff-list-file::before{background:#ffffff}l13-diff-list-file{box-sizing:border-box;overflow:hidden;padding:2px 10px 3px 38px;position:relative;width:50%}l13-diff-list-file.-file::before,l13-diff-list-file.-folder::before{background:var(--vscode-foreground);content:'';display:block;height:16px;left:17px;-webkit-mask-position:50% 50%;mask-position:50% 50%;-webkit-mask-repeat:no-repeat;mask-repeat:no-repeat;position:absolute;top:2px;width:16px}l13-diff-list-file.-file::before{-webkit-mask-image:url(\"file.svg\");mask-image:url(\"file.svg\")}l13-diff-list-file.-folder::before{-webkit-mask-image:url(\"folder.svg\");mask-image:url(\"folder.svg\")}\n",
	"l13-diff-menu/l13-diff-menu.css": ":host{background:var(--vscode-sideBar-background);box-shadow:0px 5px 8px var(--vscode-widget-shadow, transparent);box-sizing:border-box;display:block}:host>l13-diff-menu-lists>ul{border-top:solid 1px var(--vscode-pickerGroup-border);list-style-type:none;margin:0 0 0 0;padding:0 0 0 0}:host>l13-diff-menu-lists>ul:first-child{border:none}:host>l13-diff-menu-lists>ul::before{color:var(--vscode-pickerGroup-foreground);content:attr(data-text);float:right;padding:4px 10px 5px 10px}:host>l13-diff-menu-lists>ul>li{color:var(--vscode-foreground);cursor:pointer;margin:0 0 0 0;padding:4px 10px 5px 10px;user-select:none}:host>l13-diff-menu-lists>ul>li.-active,:host>l13-diff-menu-lists>ul>li.-selected,:host>l13-diff-menu-lists>ul>li:hover{background:var(--vscode-list-hoverBackground);color:var(--vscode-list-hoverForeground)}\n",
	"l13-diff-panel/l13-diff-panel.css": ":host{background:var(--vscode-sideBar-background);color:var(--vscode-foreground);display:block;position:relative;width:100%;z-index:1;transition:box-shadow 0.3s}:host.-shadow{box-shadow:0 5px 8px var(--vscode-widget-shadow)}l13-diff-loading{animation:loading 2s linear infinite;background:linear-gradient(90deg, transparent 0%, var(--vscode-progressBar-background) 2%, var(--vscode-progressBar-background) 8%, transparent 10%) no-repeat;background-size:50% 100%;bottom:0;display:block;height:2px;left:0;position:absolute;right:0;width:100%}@keyframes loading{0%{background-position:0}100%{background-position:200%}}\n",
	"l13-diff-swap/l13-diff-swap.css": ":host{display:block;user-select:none}:host>button{background:transparent;border:0;cursor:pointer;height:21px;margin:2px 0 0 0;padding:0 0 0 0;position:relative;width:21px}:host>button::before{background:var(--vscode-foreground);content:'';height:100%;left:0;-webkit-mask-image:url(\"swap.svg\");mask-image:url(\"swap.svg\");-webkit-mask-position:50% 50%;mask-position:50% 50%;-webkit-mask-repeat:no-repeat;mask-repeat:no-repeat;position:absolute;top:0;width:100%}:host>button:focus{outline:solid 1px var(--vscode-focusBorder, transparent)}:host>button:hover::before{background:var(--vscode-button-hoverBackground)}:host>button[disabled]{opacity:0.3;cursor:default}:host>button[disabled]:hover::before{background:var(--vscode-foreground) !important}\n",
	"l13-diff-views/l13-diff-views.css": ":host{cursor:default;display:block;padding-left:10px;user-select:none}:host>input[type=\"checkbox\"]{-webkit-appearance:none;appearance:none;background:transparent;cursor:pointer;height:21px;margin:0 10px 0 0;padding:0 0 0 0;position:relative;width:21px}:host>input[type=\"checkbox\"]::before{background:var(--vscode-foreground);content:'';height:100%;left:0;-webkit-mask-position:50% 50%;mask-position:50% 50%;-webkit-mask-repeat:no-repeat;mask-repeat:no-repeat;position:absolute;top:0;width:100%}:host>input[type=\"checkbox\"]:focus{outline:solid 1px var(--vscode-focusBorder, transparent)}:host>input[type=\"checkbox\"]:hover{cursor:pointer}:host>input[type=\"checkbox\"]:hover::before{background:var(--vscode-button-hoverBackground)}:host>input[type=\"checkbox\"][disabled]{opacity:0.3;cursor:default}:host>input[type=\"checkbox\"][disabled]:hover::before{background:var(--vscode-foreground) !important}:host>input[type=\"checkbox\"]:checked::after{background:50% 50% no-repeat var(--vscode-settings-checkboxForeground, var(--vscode-foreground));content:'';height:10px;-webkit-mask-image:url(\"checked.svg\");mask-image:url(\"checked.svg\");-webkit-mask-position:50% 50%;mask-position:50% 50%;-webkit-mask-repeat:no-repeat;mask-repeat:no-repeat;right:-5px;position:absolute;bottom:-5px;width:10px}:host>input[type=\"checkbox\"]#l13_show_unchanged::before{-webkit-mask-image:url(\"show-unchanged.svg\");mask-image:url(\"show-unchanged.svg\")}:host>input[type=\"checkbox\"]#l13_show_unchanged:hover::before{background:var(--vscode-button-hoverBackground)}:host>input[type=\"checkbox\"]#l13_show_deleted::before{-webkit-mask-image:url(\"show-deleted.svg\");mask-image:url(\"show-deleted.svg\")}:host>input[type=\"checkbox\"]#l13_show_deleted:hover::before{background:var(--vscode-gitDecoration-deletedResourceForeground)}:host>input[type=\"checkbox\"]#l13_show_modified::before{-webkit-mask-image:url(\"show-modified.svg\");mask-image:url(\"show-modified.svg\")}:host>input[type=\"checkbox\"]#l13_show_modified:hover::before{background:var(--vscode-gitDecoration-modifiedResourceForeground)}:host>input[type=\"checkbox\"]#l13_show_untracked::before{-webkit-mask-image:url(\"show-untracked.svg\");mask-image:url(\"show-untracked.svg\")}:host>input[type=\"checkbox\"]#l13_show_untracked:hover::before{background:var(--vscode-gitDecoration-untrackedResourceForeground)}\n",
	"l13-diff/l13-diff.css": ":host{font-size:0.8125rem;display:flex;flex-direction:column;max-height:100%}l13-diff-panel{position:relative;z-index:1}l13-diff-folders{display:flex;position:relative;z-index:2}l13-diff-input{box-sizing:border-box;margin:10px 10px 10px 16px;position:relative;width:50%;z-index:0}l13-diff-input:first-child{margin:10px 15px 10px 10px}l13-diff-menu{max-height:50vh;position:absolute;overflow:auto;width:100%;z-index:3}l13-diff-swap{position:absolute;left:calc(50% - 10px);top:10px;z-index:1}l13-diff-tools{display:flex;margin:0 0 7px 0;position:relative;z-index:1}l13-diff-views,l13-diff-compare{width:33%}l13-diff-actions{width:34%}l13-diff-list{position:relative;z-index:0}l13-diff-list:focus{outline:solid 1px var(--vscode-focusBorder, transparent);outline-offset:-1px}::-webkit-scrollbar{width:10px;height:10px}::-webkit-scrollbar-thumb{background-color:var(--vscode-scrollbarSlider-background)}::-webkit-scrollbar-thumb:hover{background-color:var(--vscode-scrollbarSlider-hoverBackground)}::-webkit-scrollbar-thumb:active{background-color:var(--vscode-scrollbarSlider-activeBackground)}\n"
};