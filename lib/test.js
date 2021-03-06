/**
 * @file check, check the component's validity
 * @author X-Jray(z.xuanjian@gmail.com)
*/

require('babel-register');
var path = require('path');
var fs = require('fs');
var chalk = require('chalk');

function main(cmptName) {
    var packageObj = require(path.join(process.cwd(), 'package.json'));
    var cmptName = packageObj.config.cmptName;
    var pathName = path.join(process.cwd(), 'src', cmptName, cmptName + '.editor');
    // editor parser
    delete require.cache[require.resolve(pathName)];
    var content = require(pathName).default;

    if (!content.name || !content.displayName || !content.imgViewSrc) {
        console.log(chalk.red('请完善你的组件配置文件'));
        process.exit(1);
    }

    var props = {};
    if (Object.prototype.toString.call(content.propertiesGroup) !== '[object Array]') {
        console.log(chalk.red(cmptName + '组件配置文件Type Error, propertiesGroup should be an array！'));
        process.exit(1);
    }
    content.propertiesGroup.forEach(function (group) {
        if (Object.prototype.toString.call(group.properties) !== '[object Array]') {
            console.log(chalk.red(cmptName + '组件配置文件Type Error, properties should be an array'));
            process.exit(1);
        }

        var re4Type = /\s*number|text|color|image|action|select|textarea|array\s*/;

        group.properties.forEach(function (item) {
            if (!re4Type.test(item.type)) {
                console.log(chalk.red(cmptName + '组件配置文件Type Error, config type number|text|color|image|action|select|textarea|array'));
                process.exit(1);
            }
        });
    });
    console.log(chalk.green(cmptName + ' 组件配置文件检查通过！'));
}

module.exports = main;
