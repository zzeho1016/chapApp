package com.cos.chatapp;


import java.time.LocalDateTime;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import lombok.Data;

@Data
@Document(collection="chat")
public class Chat {
	
	@Id // 스프링 프레임워크 
	private String id; // 몽고DB가 자동으로 id만들어 주는데 타입이 Bson
	private String message;
	private String sender; //보내는 사람 
	private String receiver; // 받는 사람 (귓속말 ) 
	private Integer roomNum;// 방 번호 

	private LocalDateTime createAt;
}
