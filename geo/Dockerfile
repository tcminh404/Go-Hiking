FROM openjdk:11-jdk as build

WORKDIR /build

ADD ./ /build/

RUN ./mvnw clean install -f /build/common/pom.xml
RUN ./mvnw clean install -f /build/geo/pom.xml

FROM openjdk:11-jre

ARG JAR_FILE=*.jar
COPY --from=build /build/geo/target/${JAR_FILE} /usr/share/go-hiking/geo/geo.jar

ENTRYPOINT ["java", "-jar", "/usr/share/go-hiking/geo/geo.jar"]

EXPOSE 9000