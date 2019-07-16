#/bin/bash

export COMPANY="aclsystems"
export APP="libreta"
export TRAIL=""
export WKDIR=/Users/Arturo/aclprojects/libreta
export VERSION=$(node $WKDIR/misc/getVersion.js)
export LATEST=$COMPANY/$APP$TRAIL:latest
export CURRENT_IMAGE=$COMPANY/$APP$TRAIL:$VERSION

cd $WKDIR
echo $CURRENT_IMAGE
echo $LATEST

docker push $CURRENT_IMAGE
docker push $LATEST
