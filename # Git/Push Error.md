### Solution 1 
Instead of: 	
```https://github.com/hungbui7690/javascript-tutorial-2.git```
Change to : 	
```git@github.com:hungbui7690/javascript-tutorial-2.git``` 
Command: 		git remote set-url origin git@github.com:hungbui7690/javascript-tutorial-2.git 
Check Origins: 	git remote -v



### Solution 2 
```bash
git config --global core.compression 0  

git config --global http.postBuffer 157286400

git config --global http.postBuffer 524288000

git config --global http.version HTTP/1.1
```