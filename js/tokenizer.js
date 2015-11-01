module.exports = tokenizer;
function tokenizer(content) {
    var result = [];
    var symbol = ['{', '}', ':', ';', ',', '(', ')', '.', '#', '~', , '<', '>', '*', '+', '[', ']', '=', '|', '^'];
    var isInString = false;
    var tmpString = '';
    for (var i = 0; i < content.length; i++) {
        var t = content[i];
        if (t == '\'' || t == '\"') {
            if (isInString) {
                tmpString += t;
                isInString = false;
                result.push(tmpString);
                tmpString = '';
            } else {
                tmpString += t;
                isInString = true;
            }
            continue;
        }
        if (isInString) {
            //字符串状态
            tmpString += t;
        } else {
            //非字符串状态
            if (t == '\n' || t == ' ' || t == '    ') {
                if (tmpString.length != 0) {
                    result.push(tmpString);
                    tmpString = '';
                }
                continue;
            }
            if (symbol.indexOf(t) != -1) {
                if (tmpString.length != 0) {
                    result.push(tmpString);
                    tmpString = '';
                }
                result.push(t);
                continue;
            }
            tmpString += t;
        }
    }
    return result;
}