cp ./restlet/*.jar $MAVEN_HOME/appJars
mvn install:install-file -Dfile=$MAVEN_HOME/appJars/org.restlet.ext.servlet-2.1.1.jar -DgroupId=applifire -DartifactId=org-restlet-ext-servlet -Dversion=2.1.1 -Dpackaging=jar

mvn install:install-file -Dfile=$MAVEN_HOME/appJars/org.restlet-2.1.1.jar -DgroupId=applifire -DartifactId=org-restlet -Dversion=2.1.1 -Dpackaging=jar

cp ./google-voice/google-voice-1.14.jar $MAVEN_HOME/appJars
mvn install:install-file -Dfile=$MAVEN_HOME/appJars/google-voice-1.14.jar -DgroupId=google -DartifactId=google-voice -Dversion=1.14 -Dpackaging=jar

cp ./gtranslateapi/gtranslateapi-1.0.jar $MAVEN_HOME/appJars
mvn install:install-file -Dfile=$MAVEN_HOME/appJars/gtranslateapi-1.0.jar -DgroupId=gtranslateapi -DartifactId=gtranslateapi -Dversion=1.0 -Dpackaging=jar
