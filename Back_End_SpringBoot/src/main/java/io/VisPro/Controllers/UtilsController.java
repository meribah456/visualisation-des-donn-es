package io.VisPro.Controllers;

import java.io.FileOutputStream;
import java.io.IOException;
import java.io.OutputStream;
import java.util.HashMap;
import java.util.Map;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.FileSystemResource;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.http.converter.HttpMessageConverter;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;

import io.VisPro.Dao.FileDao;
import io.VisPro.Models.File;
import io.VisPro.Models.FileRepository;
import io.VisPro.Models.FileWithColumnName;
import javassist.bytecode.ByteArray;

@CrossOrigin("*")
@RestController
public class UtilsController {

    private static final Logger logger = LoggerFactory.getLogger(UtilsController.class);
    @Autowired
    private FileDao fileRepository;
    private RestTemplate restTemplate = new RestTemplate();
    @PostMapping(value = "/LabelEncoder")
    public ResponseEntity LabelEncoder(@RequestParam String columnName, @RequestParam String fileIdString) throws IOException {
    	long fileId = Long.parseLong(fileIdString);
    	File currentFileBuffer = fileRepository.findById(fileId);
    	HttpHeaders headers = new HttpHeaders();
    	headers.setContentType(MediaType.MULTIPART_FORM_DATA);
        // set `accept` header
        //headers.setAccept(Collections.singletonList(MediaType.APPLICATION_JSON));
    	MultiValueMap<String, Object> body = new LinkedMultiValueMap<>();
        // create a map for post parameters
        java.io.File file = new java.io.File("file");
        OutputStream os = new FileOutputStream(file);
        os.write(currentFileBuffer.getFile());
        os.close();
        FileSystemResource fileSystemResource = new FileSystemResource(file);
        body.add("file", fileSystemResource);
        body.add("columnName", columnName);
        // build the request
        HttpEntity<MultiValueMap<String, Object>> requestEntity = new HttpEntity<>(body, headers);        
        // send POST request
        ResponseEntity<byte[]> response = restTemplate.postForEntity("http://localhost:5000/LabelEncoder", requestEntity, byte[].class);
        FileController.lastFile = currentFileBuffer;
        byte[] buff = response.getBody();
        if(response.getStatusCode()==HttpStatus.OK) {
        	fileRepository.delete(currentFileBuffer);
        	currentFileBuffer.setFile(buff);
            fileRepository.save(currentFileBuffer);
            return ResponseEntity.ok().body("Encoded!");
        }else {
        	return ResponseEntity.ok().body("Parsing error");
        }
    }
    @PostMapping(value = "/FillNaNMean")
    public ResponseEntity FillNaNMean(@RequestParam(defaultValue = "") String columnName, @RequestParam String fileIdString) throws IOException {
    	long fileId = Long.parseLong(fileIdString);
    	File currentFileBuffer = fileRepository.findById(fileId);
    	HttpHeaders headers = new HttpHeaders();
    	headers.setContentType(MediaType.MULTIPART_FORM_DATA);
        // set `accept` header
        //headers.setAccept(Collections.singletonList(MediaType.APPLICATION_JSON));
    	MultiValueMap<String, Object> body = new LinkedMultiValueMap<>();
        // create a map for post parameters
        java.io.File file = new java.io.File("file");
        OutputStream os = new FileOutputStream(file);
        os.write(currentFileBuffer.getFile());
        os.close();
        FileSystemResource fileSystemResource = new FileSystemResource(file);
        if(columnName.length()==0) {
        	body.add("file", fileSystemResource);
        }else {
        	body.add("columnName", columnName);
        	body.add("file", fileSystemResource);
        }
        // build the request
        HttpEntity<MultiValueMap<String, Object>> requestEntity = new HttpEntity<>(body, headers);        
        // send POST request
        ResponseEntity<byte[]> response = restTemplate.postForEntity("http://localhost:5000/FillNaNMean", requestEntity, byte[].class);
        FileController.lastFile = currentFileBuffer;
        byte[] buff = response.getBody();
        if(response.getStatusCode()==HttpStatus.OK) {
        	fileRepository.delete(currentFileBuffer);
        	currentFileBuffer.setFile(buff);
            fileRepository.save(currentFileBuffer);
            return ResponseEntity.ok().body("Encoded!");
        }else {
        	return ResponseEntity.ok().body("Parsing error");
        }
    }
    @PostMapping(value = "/FillNaNMedian")
    public ResponseEntity FillNaNMedian(@RequestParam(defaultValue = "") String columnName, @RequestParam String fileIdString) throws IOException {
    	long fileId = Long.parseLong(fileIdString);
    	File currentFileBuffer = fileRepository.findById(fileId);
    	HttpHeaders headers = new HttpHeaders();
    	headers.setContentType(MediaType.MULTIPART_FORM_DATA);
        // set `accept` header
        //headers.setAccept(Collections.singletonList(MediaType.APPLICATION_JSON));
    	MultiValueMap<String, Object> body = new LinkedMultiValueMap<>();
        // create a map for post parameters
        java.io.File file = new java.io.File("file");
        OutputStream os = new FileOutputStream(file);
        os.write(currentFileBuffer.getFile());
        os.close();
        FileSystemResource fileSystemResource = new FileSystemResource(file);
        if(columnName.length()==0) {
        	body.add("file", fileSystemResource);
        }else {
        	body.add("columnName", columnName);
        	body.add("file", fileSystemResource);
        }
        // build the request
        HttpEntity<MultiValueMap<String, Object>> requestEntity = new HttpEntity<>(body, headers);        
        // send POST request
        ResponseEntity<byte[]> response = restTemplate.postForEntity("http://localhost:5000/FillNaNMedian", requestEntity, byte[].class);
        FileController.lastFile = currentFileBuffer;
        byte[] buff = response.getBody();
        if(response.getStatusCode()==HttpStatus.OK) {
        	fileRepository.delete(currentFileBuffer);
        	currentFileBuffer.setFile(buff);
            fileRepository.save(currentFileBuffer);
            return ResponseEntity.ok().body("Encoded!");
        }else {
        	return ResponseEntity.ok().body("Parsing error");
        }
    }
    
    @PostMapping(value = "/StandardScaler")
    public ResponseEntity StandardScaler(@RequestParam String xAx, @RequestParam String yAx, @RequestParam String fileIdString) throws IOException {
    	long fileId = Long.parseLong(fileIdString);
    	File currentFileBuffer = fileRepository.findById(fileId);
    	HttpHeaders headers = new HttpHeaders();
    	headers.setContentType(MediaType.MULTIPART_FORM_DATA);
        // set `accept` header
        //headers.setAccept(Collections.singletonList(MediaType.APPLICATION_JSON));
    	MultiValueMap<String, Object> body = new LinkedMultiValueMap<>();
        // create a map for post parameters
        java.io.File file = new java.io.File("file");
        OutputStream os = new FileOutputStream(file);
        os.write(currentFileBuffer.getFile());
        os.close();
        FileSystemResource fileSystemResource = new FileSystemResource(file);
        body.add("xAx", xAx);
        body.add("yAx", yAx);
        body.add("file", fileSystemResource);
        // build the request
        HttpEntity<MultiValueMap<String, Object>> requestEntity = new HttpEntity<>(body, headers);        
        // send POST request
        ResponseEntity<byte[]> response = restTemplate.postForEntity("http://localhost:5000/StandardScaler", requestEntity, byte[].class);
        FileController.lastFile = currentFileBuffer;
        byte[] buff = response.getBody();
        if(response.getStatusCode()==HttpStatus.OK) {
        	fileRepository.delete(currentFileBuffer);
        	currentFileBuffer.setFile(buff);
            fileRepository.save(currentFileBuffer);
            return ResponseEntity.ok().body("Scaled");
        }else {
        	return ResponseEntity.ok().body("Parsing error");
        }
    }
}