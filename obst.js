const buildTree = (root, curr_index=0, index=false, delimiter='-') => {
    if(!root) return [[],0,0,0];
    let line1 = [];
    let line2=[]
    let node_repr = index ? `${curr_index}${delimiter}${root.value}` : root.value.toString();
    let new_root_width = node_repr.length;
    let gap_size = node_repr.length;
    let [l_box, l_box_width, l_root_start, l_root_end] = buildTree(root.left, (2 * curr_index) + 1, index, delimiter);
    let [r_box, r_box_width, r_root_start, r_root_end] = buildTree(root.right, (2 * curr_index) + 2, index, delimiter);
    let new_root_start=0;
    let new_root_end=0;
    if(l_box_width > 0){
        l_root = Math.floor((l_root_start + l_root_end) / 2) + 1;
        line1.push(' '.repeat(l_root +1));
        line1.push('_'.repeat(l_box_width - l_root));
        line2.push(' '.repeat(l_root) + '/');
        line2.push(' '.repeat(l_box_width - l_root));
        new_root_start = l_box_width + 1;
        gap_size += 1;
    }else{
        new_root_start = 0;
    }
    line1.push(node_repr);
    line2.push(' '.repeat(new_root_width));
    if(r_box_width > 0){
        r_root = Math.floor((r_root_start + r_root_end) / 2);
        line1.push('_'.repeat(r_root));
        line1.push(' '.repeat(r_box_width - r_root + 1));
        line2.push(' '.repeat(r_root) + '\\');
        line2.push(' '.repeat(r_box_width - r_root));
        gap_size += 1;
    }
    new_root_end = new_root_start + new_root_width - 1;
    new_box = [line1.join(''), line2.join('')];
    let l_line,r_line;
    for(let i=0; i < Math.max(l_box.length, r_box.length); i++){
      if(i < l_box.length) l_line = l_box[i];
      else l_line = ' '.repeat(l_box_width);
      if(i < r_box.length) r_line = r_box[i];
      else r_line = ' '.repeat(r_box_width);
      new_box.push(l_line + ' '.repeat(gap_size) + r_line);
    }
    return [new_box, new_box[0].length, new_root_start, new_root_end];
};
  
class Node{
    constructor(value){
        this.value = value;
        this.left = null;
        this.right = null;
    }
}

class BinarySearchTree{
    constructor(){
        this.root = null; 
        this.length = 0;
    }
    bulkInsert(values){
      for(let value of values){
        this.insert(value);
      }
      return this;
    }
    insert(value){
        let node = new Node(value);
        if(!this.root){
            this.root = node;
            this.length += 1;
            return this;
        }else{
            let currentNode = this.root;
            while(true){
                if(value < currentNode.value){
                    if(!currentNode.left){
                        currentNode.left = node;
                        this.length += 1;
                        return this;
                    }
                    currentNode = currentNode.left;
                }else{
                    if(!currentNode.right){
                        currentNode.right = node;
                        this.length += 1;
                        return this;
                    }
                    currentNode = currentNode.right;
                }
            }
        }
    }
    search(value){
        if(!this.root){
            return false;
        }
        let currentNode = this.root;
        while(currentNode){
            if( value < currentNode.value){
                currentNode = currentNode.left;
            }else if(value > currentNode.value){
                currentNode = currentNode.right;
            }else if(value === currentNode.value){
                return true;
            }
        }
        return false;
    }
    remove(value){
        if(!this.root){
            return false;
        }
        let currentNode = this.root;
        let parentNode = null;
        while(currentNode){
            if(value < currentNode.value){
                parentNode = currentNode;
                currentNode = currentNode.left;
            }else if(value > currentNode.value){
                parentNode = currentNode;
                currentNode = currentNode.right;
            }else if( value === currentNode.value){
                if(currentNode.right === null){
                    if(parentNode === null){
                        this.root = currentNode.left;
                    }else{
                        if(parentNode.value > currentNode.value){
                            parentNode.left = currentNode.left;
                        }else if(parentNode.value < currentNode.value){
                            parentNode.right = currentNode.left;
                        }
                    }
                }else if(currentNode.right.left === null){
                    if(parentNode === null){
                        this.root = currentNode.left;
                    }else{
                        currentNode.right.left = currentNode.left;
                        
                        if(parentNode.value > currentNode.value){ 
                            parentNode.left = currentNode.right;
                        }else if(parentNode.value < currentNode.value){
                            parentNode.right = currentNode.right;
                        }
                    }
                }else{
                    let leftMost = currentNode.right.left;
                    let leftMostParent = currentNode.right;
                    while(leftMost.left !== null){
                        leftMostParent = leftMost;
                        leftMost = leftMost.left;
                    }
                    leftMostParent.left = leftMost.right;
                    leftMost.left = currentNode.left;
                    leftMost.right = currentNode.right;
  
                    if(parentNode === null){
                        this.root = leftMost;
                    }else{
                        if(parentNode.value > currentNode.value){
                            parentNode.left = leftMost;
                        }else if(parentNode.value < currentNode.value){
                            parentNode.right = leftMost;
                        }
                    }
                }
                this.length -= 1;
                return true;
            }
        }
        return false;
    }
    print(){
      let lines = buildTree(this.root,0,false,'-')[0];
      let output = "";
      for(let line of lines){
        output += line +'\n';
      }
      return output;
    }
}
  
module.exports = BinarySearchTree;
  