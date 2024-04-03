FROM openjdk:11-jdk as build

WORKDIR /build

ADD ./ /build/

RUN ./mvnw clean install -f /build/common/pom.xml
RUN ./mvnw clean install -f /build/post/pom.xml

FROM openjdk:11-jdk

ARG JAR_FILE=*.jar
COPY --from=build /build/post/target/${JAR_FILE} /usr/share/go-hiking/post/post.jar

ENTRYPOINT ["java", "-jar", "/usr/share/go-hiking/post/post.jar"]

EXPOSE 9020