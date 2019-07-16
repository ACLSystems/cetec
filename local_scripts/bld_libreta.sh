#/bin/bash

export COMPANY="aclsystems"
export APP="cetec"
export TRAIL=""
export WKDIR=/Users/Arturo/aclprojects/cetec
export VERSION=$(node $WKDIR/misc/getVersion.js)
export LATEST=$COMPANY/$APP$TRAIL:latest
export CURRENT_IMAGE=$COMPANY/$APP$TRAIL:$VERSION

cd $WKDIR

echo "Generando imagenes para:"
echo $CURRENT_IMAGE
#echo $LATEST

echo "Ejecutando ng build --prod"
ng build --prod --aot --vendor-chunk --common-chunk --delete-output-path --buildOptimizer
echo "Ejecutando docker build"
docker build -t $CURRENT_IMAGE .
echo "Generando docker tag"
docker tag $CURRENT_IMAGE $LATEST
echo "listo"
