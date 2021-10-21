FROM openjdk:11-jdk

ARG JAR_FILE=*.jar
ADD target/${JAR_FILE} /usr/share/go-hiking/auth/auth.jar

ENTRYPOINT ["java", "-jar", "/usr/share/go-hiking/auth/auth.jar"]

EXPOSE 9010