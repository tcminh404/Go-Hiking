FROM openjdk:11-jdk

ARG JAR_FILE=*.jar
ADD target/${JAR_FILE} /usr/share/go-hiking/geo/geo.jar

ENTRYPOINT ["java", "-jar", "/usr/share/go-hiking/geo/geo.jar"]

EXPOSE 9000