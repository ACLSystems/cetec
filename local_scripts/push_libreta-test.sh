#/bin/bash

export COMPANY="aclsystems"
export APP="libreta"
export TRAIL="-test"
export WKDIR=/Users/Arturo/aclprojects/libreta
export VERSION=$(node $WKDIR/misc/getVersion.js)
export LATEST=$COMPANY/$APP$TRAIL:latest
export CURRENT_IMAGE=$COMPANY/$APP$TRAIL:$VERSION

cd $WKDIR

echo "Empujando imágenes"
echo $CURRENT_IMAGE
echo $LATEST

echo "Empujando imagen"
docker push $CURRENT_IMAGE
echo "Empujando tag"
docker push $LATEST
