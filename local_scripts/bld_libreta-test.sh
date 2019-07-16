#/bin/bash

export COMPANY="aclsystems"
export APP="libreta"
export TRAIL="-test"
export WKDIR=/Users/Arturo/aclprojects/Libreta
export VERSION=$(node $WKDIR/misc/getVersion.js)
export LATEST=$COMPANY/$APP$TRAIL:latest
export CURRENT_IMAGE=$COMPANY/$APP$TRAIL:$VERSION

cd $WKDIR

echo "Generando imagenes para:"
echo $CURRENT_IMAGE
#echo $LATEST

echo "Ejecutando ng build"
ng build
echo "Ejecutando docker build"
docker build -t $CURRENT_IMAGE .
echo "Generando docker tag"
docker tag $CURRENT_IMAGE $LATEST
echo "listo"
