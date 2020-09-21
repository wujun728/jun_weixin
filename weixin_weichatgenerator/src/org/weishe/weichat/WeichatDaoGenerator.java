/*
 * Copyright (C) 2011 Markus Junginger, greenrobot (http://greenrobot.de)
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
package org.weishe.weichat;

import de.greenrobot.daogenerator.DaoGenerator;
import de.greenrobot.daogenerator.Entity;
import de.greenrobot.daogenerator.Property;
import de.greenrobot.daogenerator.Schema;
import de.greenrobot.daogenerator.ToMany;

/**
 * Generates entities and DAOs for the example project DaoExample.
 * 
 * Run it as a Java application (not Android).
 * 
 * @author Markus
 */
public class WeichatDaoGenerator {

	public static void main(String[] args) throws Exception {
		Schema schema = new Schema(1, "org.weishe.weichat");

		// addNote(schema);
		// addCustomerOrder(schema);

		addChatMessage(schema);
		addTodo(schema);
		addAttachment(schema);
		new DaoGenerator().generateAll(schema, "../weichatApp/src-gen-temp");
	}

	private static void addAttachment(Schema schema) {
		Entity attachment = schema.addEntity("Attachment");
		attachment.addIdProperty();
		attachment.addIntProperty("attachmentId");
		attachment.addStringProperty("name");
		attachment.addStringProperty("groupName");
		attachment.addStringProperty("path");
		attachment.addIntProperty("type");
		attachment.addDateProperty("createDate");
	}

	private static void addTodo(Schema schema) {
		Entity todo = schema.addEntity("Todo");
		todo.addIdProperty();
		todo.addIntProperty("todoId");
		todo.addIntProperty("whoId");
		todo.addBooleanProperty("checked");
		todo.addIntProperty("type");
		todo.addIntProperty("fromId");
		todo.addIntProperty("groupId");
		todo.addDateProperty("createDate");
		todo.addBooleanProperty("complete");
		todo.addBooleanProperty("agree");
		todo.addStringProperty("requestMsg");
		todo.addStringProperty("handleMsg");
		todo.addStringProperty("handleDate");
		todo.addStringProperty("todoSubject");
	}

	private static void addChatMessage(Schema schema) {
		Entity chatMessage = schema.addEntity("ChatMessage");
		chatMessage.addIdProperty();
		chatMessage.addIntProperty("chatMessageId");
		chatMessage.addStringProperty("content");
		chatMessage.addIntProperty("fromId");
		chatMessage.addIntProperty("toId");
		chatMessage.addDateProperty("date");
		chatMessage.addIntProperty("type");
		chatMessage.addIntProperty("msgType");
		chatMessage.addIntProperty("chatGroupId");
		chatMessage.addIntProperty("discussionGroupId");
		chatMessage.addIntProperty("whoId");
		chatMessage.addBooleanProperty("checked");
		chatMessage.addLongProperty("attachmentId");
		chatMessage.addIntProperty("contentType");
		chatMessage.addStringProperty("fileGroupName");
		chatMessage.addStringProperty("filePath");
		chatMessage.addStringProperty("uuid");
		chatMessage.addIntProperty("status");
	}

}
