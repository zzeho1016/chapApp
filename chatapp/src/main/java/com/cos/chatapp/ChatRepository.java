package com.cos.chatapp;

import org.springframework.data.mongodb.repository.Query;
import org.springframework.data.mongodb.repository.ReactiveMongoRepository;
import org.springframework.data.mongodb.repository.Tailable;

import reactor.core.publisher.Flux;

public interface ChatRepository extends ReactiveMongoRepository<Chat, String>{

	@Tailable //커서를 안닫고 유지
	@Query("{sender: ?0, receiver: ?1}")
	Flux<Chat> mFindBySender(String sender, String receiver); 	
	// Flux 흐름 // 계속해서 데이터를 받겠
	
	@Tailable
	@Query("{roomNum: ?0 }")
	Flux<Chat> mFindByRoomNum(Integer roomNum);
}