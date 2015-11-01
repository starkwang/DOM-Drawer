module.exports = parser;
function parser(tokenArray) {
    var tagArray = [];
    var nodeHeap = [];
    var nodeTree = {
        name: 'root',
        children: []
    };
    var isInScript = false,
        isInStyle = false;
    nodeHeap.push(nodeTree);
    tokenArray.forEach(function(item, index) {
        if (item == '<') {
            tagArray.push(tokenArray[index + 1]);
        }
    })
    console.log(tagArray);
    var selfEndTags = ['img', 'br', 'hr', 'col', 'area', 'link', 'meta', 'frame', 'input', 'param'];
    tagArray.forEach(function(item, index) {
        if (item[0] == '!' || selfEndTags.indexOf(item) != -1) {
            //自封闭标签、注释
            nodeHeap[nodeHeap.length - 1].children.push({
                name: item[0] == '!' ? '<!--comment-->' : item,
                children: []
            });
        } else {
            if (item[0] != '/') {
                //普通标签头
                if (!isInScript && !isInStyle) {
                    var newNode = {
                        name: item,
                        children: []
                    }
                    nodeHeap[nodeHeap.length - 1].children.push(newNode);
                    nodeHeap.push(newNode);
                }
                if (item == 'script') {
                    isInScript = true;
                }
                if (item == 'style') {
                    isInStyle = true;
                }
            } else {
                //普通标签尾
                if (item.split('/')[1] == nodeHeap[nodeHeap.length - 1].name) {
                    nodeHeap.pop();
                }
                if (item.split('/')[1] == 'script') {
                    isInScript = false;
                }
                if (item.split('/')[1] == 'style') {
                    isInStyle = false;
                }
            }
        }
    })
    return nodeTree;
}