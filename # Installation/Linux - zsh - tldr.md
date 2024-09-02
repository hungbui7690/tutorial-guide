# Linux Post Install

## Install zsh 
```bash
- sudo apt install zsh
```

## Install zsh-syntax-highlighting 
```bash
sudo apt install git

git clone https://github.com/zsh-users/zsh-syntax-highlighting.git

echo "source ${(q-)PWD}/zsh-syntax-highlighting/zsh-syntax-highlighting.zsh" >> ${ZDOTDIR:-$HOME}/.zshrc

source ./zsh-syntax-highlighting/zsh-syntax-highlighting.zsh
```

## Enable syntax highlighting on ZSH using the Oh My ZSH (recommended) 

```bash
sh -c "$(wget https://raw.github.com/ohmyzsh/ohmyzsh/master/tools/install.sh -O -)"

git clone https://github.com/zsh-users/zsh-syntax-highlighting.git ${ZSH_CUSTOM:-~/.oh-my-zsh/custom}/plugins/zsh-syntax-highlighting

nano ~/.zshrc
- from: plugins=(git) 
- to: plugins=(git zsh-syntax-highlighting)
```

restart terminal



## Install TLDR  
```bash
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.38.0/install.sh | bash

source ~/.bashrc

nvm install node

npm -v

npm install tldr -g
```


If there are errors, run these: 
```bash
sudo chown -R root:$(whoami) /tmp/tldr
sudo chmod -R 775 /tmp/tldr
```

