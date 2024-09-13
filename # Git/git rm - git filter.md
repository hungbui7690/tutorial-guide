```bash
git filter-branch --force --index-filter 'git rm -r --cached --ignore-unmatch node_modules' --tag-name-filter cat -- --all
```