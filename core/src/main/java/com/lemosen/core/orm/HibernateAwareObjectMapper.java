//package com.lemosen.core.orm;
//
//import com.fasterxml.jackson.core.JsonFactory;
//import com.fasterxml.jackson.databind.DeserializationFeature;
//import com.fasterxml.jackson.databind.ObjectMapper;
//import com.fasterxml.jackson.databind.deser.DefaultDeserializationContext;
//import com.fasterxml.jackson.databind.ser.DefaultSerializerProvider;
//import com.fasterxml.jackson.datatype.hibernate5.Hibernate5Module;
//
///**
// * @author Aidy_He
// */
//public class HibernateAwareObjectMapper extends ObjectMapper {
//
//    /**
//     *
//     */
//    public HibernateAwareObjectMapper() {
//        this.disable(DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES);
//        Hibernate5Module module = new Hibernate5Module();
//        module.disable(Hibernate5Module.Feature.USE_TRANSIENT_ANNOTATION);
//        registerModule(module);
//    }
//
//    /**
//     * @param jf
//     */
//    public HibernateAwareObjectMapper(JsonFactory jf) {
//        super(jf);
//    }
//
//    /**
//     * @param src
//     */
//    public HibernateAwareObjectMapper(ObjectMapper src) {
//        super(src);
//    }
//
//    /**
//     * @param jf
//     * @param sp
//     * @param dc
//     */
//    public HibernateAwareObjectMapper(JsonFactory jf,  DefaultSerializerProvider sp, DefaultDeserializationContext dc) {
//        super(jf, sp, dc);
//    }
//
//}
