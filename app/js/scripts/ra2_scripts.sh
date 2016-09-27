#!/bin/bash

# Parameters
path=$1 #OpenRA path
ra2_content=$2

#Detect Current OS
if [ "$(uname)" == "Darwin" ]; then
        DIR="/Library/Application\ Support/OpenRA/Content/ra2/"
elif [ "$(expr substr $(uname -s) 1 5)" == "Linux" ]; then
        DIR="~/.openra/Content/ra2/"
else
    DIR="%USERPROFILE%\My Documents\OpenRA\mods\ra2"
fi

# Clone RA2 from git if ra2 directory does not exist
if [ ! -d "$path/mods/ra2/" ]; then
    echo Downloading RA2 Mod from git
    git clone https://github.com/OpenRA/ra2.git $path/mods/ra2/ || >&2
    echo RA2 Mod - Download completed
else
    echo mod folder already exist
fi

#Build RA2
echo Building RA2 Mod
if [ -f $path/OpenRA.Mods.RA2/OpenRA.Mods.RA2 ]; then
    ln -s $path/mods/ra2/OpenRA.Mods.RA2 $path/OpenRA.Mods.RA2 || >&2
else
    echo OpenRA.Mods.RA2 file already exist
fi
ln -fs $path/Eluant.dll $path/OpenRA.Mods.RA2/dependencies/Eluant.dll || >&2
ln -fs $path/OpenRA.Game.exe $path/OpenRA.Mods.RA2/dependencies/OpenRA.Game.exe || >&2
ln -fs $path/mods/common/OpenRA.Mods.Common.dll $path/OpenRA.Mods.RA2/dependencies/OpenRA.Mods.Common.dll || >&2
ln -fs $path/mods/ra/OpenRA.Mods.RA.dll $path/OpenRA.Mods.RA2/dependencies/OpenRA.Mods.RA.dll || >&2
ln -fs $path/mods/ts/OpenRA.Mods.TS.dll $path/OpenRA.Mods.RA2/dependencies/OpenRA.Mods.TS.dll || >&2
xbuild $path/OpenRA.Mods.RA2/OpenRA.Mods.RA2.csproj || >&2
echo Copying debug files to ra2 folder
cp -R $path/mods/ra2/OpenRA.Mods.RA2/bin/Debug/. $path/mods/ra2/

if [ $ra2_content = true ] ; then
    echo $DIR
    if [ ! -d "$DIR" ]; then
        echo ra2 content directory do not exist
        echo creating directory for ra2 content
        sudo mkdir -p $DIR || >&2
        pushd $DIR
        sudo wget http://xwis.net/downloads/Red-Alert-2-Multiplayer.exe || >&2
        sudo 7z e Red-Alert-2-Multiplayer.exe || >&2
        sudo rm *.exe *.dll *.DLL *.wav *.mmp *.CFG *.WAR *.cache || >&2
        popd
        echo RA2 mod content downloaded
        echo RA2 Mod - Construction complete
    else
        echo directory exist
        pushd $DIR
        sudo wget http://xwis.net/downloads/Red-Alert-2-Multiplayer.exe || >&2
        sudo 7z e Red-Alert-2-Multiplayer.exe || >&2
        sudo rm *.exe *.dll *.DLL *.wav *.mmp *.CFG *.WAR *.cache || >&2
        popd
        echo RA2 mod content downloaded
        echo RA2 Mod - Construction complete
    fi
else
    echo RA2 Mod - Construction complete
fi
