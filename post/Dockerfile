FROM openjdk:11-jdk

ARG JAR_FILE=*.jar
ADD target/${JAR_FILE} /usr/share/go-hiking/post/post.jar

ENTRYPOINT ["java", "-jar", "/usr/share/go-hiking/post/post.jar"]

EXPOSE 9020