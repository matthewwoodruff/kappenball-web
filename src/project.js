require=function t(n,e,i){function o(s,r){if(!e[s]){if(!n[s]){var a="function"==typeof require&&require;if(!r&&a)return a(s,!0);if(c)return c(s,!0);var l=new Error("Cannot find module '"+s+"'");throw l.code="MODULE_NOT_FOUND",l}var u=e[s]={exports:{}};n[s][0].call(u.exports,function(t){var e=n[s][1][t];return o(e?e:t)},u,u.exports,t,n,e,i)}return e[s].exports}for(var c="function"==typeof require&&require,s=0;s<i.length;s++)o(i[s]);return o}({Ball:[function(t,n,e){"use strict";cc._RFpush(n,"fef75iJwa9OyoauzRTZuKBx","Ball");var i=t("Settings"),o={NONE:0,RIGHT:1,LEFT:-1};cc.Class({"extends":cc.Component,properties:{yVelocity:-100,xVelocity:200,interventionVelocity:100},onLoad:function(){this._energy=0,this._initialPosition=this.node.getPosition(),this._direction=o.NONE,this._intervention=o.NONE},_randomDirection:function(){return Math.random()>=.5?o.LEFT:o.RIGHT},_getNewIntervention:function(t){return t===o.NONE&&i.shouldIntervene()?this._randomDirection():i.shouldStabilise()?o.NONE:t},update:function(t){this._setIntervention(this._getNewIntervention(this._intervention));var n=this.xVelocity*this._direction*t,e=this.interventionVelocity*this._intervention*t;this.node.x+=n+e,this.node.y+=this.yVelocity*t,this._energy+=Math.abs(n)},spike:function(){this._reset()},succeed:function(){this._reset()},wallEnter:function(){this._blocked=this._movingDirection(),this._setDirection(o.NONE),this._setIntervention(o.NONE)},_movingDirection:function(){return this._direction==o.NONE?this._intervention:this._direction},wallExit:function(){delete this._blocked},getEnergy:function(){return this._energy},left:function(){this._setDirection(o.LEFT)},right:function(){this._setDirection(o.RIGHT)},stopForce:function(){this._setDirection(o.NONE)},_reset:function(){this._energy=0,this.node.setPosition(this._initialPosition.x,this._initialPosition.y)},_setDirection:function(t){this._blocked!==t&&(this._direction=t)},_setIntervention:function(t){this._blocked!==t&&(this._intervention=t)}}),cc._RFpop()},{Settings:"Settings"}],GameControls:[function(t,n,e){"use strict";cc._RFpush(n,"fcfd0X/vZVKHKb2y7dAwZmh","GameControls");var i=t("Settings");cc.Class({"extends":cc.Component,properties:{uncertaintyDisplay:{"default":null,type:cc.Label}},onLoad:function(){this._updateUncertainty(i.getStochasticity())},increase:function(){this._updateUncertainty(i.increaseStochasticity())},decrease:function(){this._updateUncertainty(i.decreaseStochasticity())},_updateUncertainty:function(t){this.uncertaintyDisplay.string=t.toFixed(1)}}),cc._RFpop()},{Settings:"Settings"}],GameMenu:[function(t,n,e){"use strict";cc._RFpush(n,"18ae5ZSznhJIak5FCwdmiER","GameMenu"),cc.Class({"extends":cc.Component,properties:{},onLoad:function(){},endGame:function(){cc.director.loadScene("Main Menu")},settings:function(){cc.director.loadScene("Settings")}}),cc._RFpop()},{}],Game:[function(t,n,e){"use strict";cc._RFpush(n,"2e0e06ccYNJj5dnAKlw3fHx","Game"),cc.Class({"extends":cc.Component,properties:{ball:{"default":null,type:cc.Node},energy:{"default":null,type:cc.Label}},onLoad:function(){cc.director.getCollisionManager().enabled=!0,this._ball=this.ball.getComponent("Ball"),this.node.on(cc.Node.EventType.TOUCH_START,this._touchStart,this),this.node.on(cc.Node.EventType.TOUCH_END,this._stopForce,this)},_touchStart:function(t){var n=this.node.convertToNodeSpace(t.getLocation()).x>=.5*this.node.getContentSize().width;this._ball[n?"left":"right"]()},_stopForce:function(){this._ball.stopForce()},update:function(){this.energy.string="Energy: "+Math.ceil(this._ball.getEnergy())}}),cc._RFpop()},{}],Menu:[function(t,n,e){"use strict";cc._RFpush(n,"b827cueVCZOWaO6gr63aJWK","Menu"),cc.Class({"extends":cc.Component,properties:{},onLoad:function(){},startGame:function(){cc.director.loadScene("Game")}}),cc._RFpop()},{}],SettingsControls:[function(t,n,e){"use strict";cc._RFpush(n,"d55fepYOPdHqoqIgNIHdg4x","SettingsControls");var i=t("Settings");cc.Class({"extends":cc.Component,properties:{maxInterventionDisplay:{"default":null,type:cc.Label},maxStabilityDisplay:{"default":null,type:cc.Label}},onLoad:function(){this._updateDisplay(this.maxInterventionDisplay,i.getMaxInterventionProbability()),this._updateDisplay(this.maxStabilityDisplay,i.getMaxStabilityProbability())},back:function(){cc.director.loadScene("Game")},increaseMaxInterventionProbability:function(){this._updateDisplay(this.maxInterventionDisplay,i.increaseMaxInterventionProbability())},decreaseMaxInterventionProbability:function(){this._updateDisplay(this.maxInterventionDisplay,i.decreaseMaxInterventionProbability())},increaseMaxStabilityProbability:function(){this._updateDisplay(this.maxStabilityDisplay,i.increaseMaxStabilityProbability())},decreaseMaxStabilityProbability:function(){this._updateDisplay(this.maxStabilityDisplay,i.decreaseMaxStabilityProbability())},_updateDisplay:function(t,n){t.string=n.toFixed(1)}}),cc._RFpop()},{Settings:"Settings"}],Settings:[function(t,n,e){"use strict";function i(t){return Math.min(t+.1,1)}function o(t){return Math.max(t-.1,0)}function c(t){return Math.random()<=s*t*.02}cc._RFpush(n,"973f5m27EtMiY1TW+7sjcO2","Settings");var s=1,r=0,a=0;n.exports={increaseMaxInterventionProbability:function(){return r=i(r)},decreaseMaxInterventionProbability:function(){return r=o(r)},increaseMaxStabilityProbability:function(){return a=i(a)},decreaseMaxStabilityProbability:function(){return a=o(a)},increaseStochasticity:function(){return s=i(s)},decreaseStochasticity:function(){return s=o(s)},shouldIntervene:function(){return c(r)},shouldStabilise:function(){return c(a)},getStochasticity:function(){return s},getMaxStabilityProbability:function(){return a},getMaxInterventionProbability:function(){return r}},cc._RFpop()},{}],Spike:[function(t,n,e){"use strict";cc._RFpush(n,"daf56RcH6NOTL/I00Thb+TB","Spike"),cc.Class({"extends":cc.Component,properties:{},onCollisionEnter:function(t){t.node.getComponent("Ball").spike()}}),cc._RFpop()},{}],Success:[function(t,n,e){"use strict";cc._RFpush(n,"9971f5Gv5dBXpDX+b9BFcj1","Success"),cc.Class({"extends":cc.Component,properties:{},onCollisionExit:function(t){t.node.getComponent("Ball").succeed()}}),cc._RFpop()},{}],Wall:[function(t,n,e){"use strict";cc._RFpush(n,"85b76NgPNRGtowXZc0XIrln","Wall"),cc.Class({"extends":cc.Component,properties:{},onCollisionEnter:function(t,n){t.node.getComponent("Ball").wallEnter()},onCollisionExit:function(t){t.node.getComponent("Ball").wallExit()}}),cc._RFpop()},{}]},{},["GameMenu","Game","Wall","Settings","Success","Menu","SettingsControls","Spike","GameControls","Ball"]);