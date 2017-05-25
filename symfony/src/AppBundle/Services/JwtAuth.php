<?php
namespace AppBundle\Services;

use Firebase\JWT\JWT;

class JwtAuth {
	
	private $manager;
	private $key;
	
	public function __construct($manager) {
		$this->manager = $manager;
		$this->key = "clave-secreta";
	}
	
	public function signup($email, $password, $getHash = null){
		
		$user = $this->manager->getRepository('BackendBundle:User')->findOneBy(
			array(
				"email" => $email
			)
		);
		$existUser = false;
		if(is_object($user)){
			$existUser = true;
			var_dump($password);
		}
		
		$user = $this->manager->getRepository('BackendBundle:User')->findOneBy(
			array(
				"email" => $email,
				"password" => $password
			)
		);
		
		if(is_object($user)){
			$signup = true;
		}else{
			$signup = false;
		}
		
		if($signup == true){
			$token = array(
				"sub" => $user->getId(),
				"email" => $user->getEmail(),
				"name" => $user->getName(),
				"surname" => $user->getSurname(),
				"password" => $user->getPassword(),
				"image" => $user->getImage(),
				"iat" => time(),
				"exp" => time() + (7 * 24 * 60 * 60),
			);
			
			$jwt = JWT::encode($token, $this->key, 'HS256');
			$decode = JWT::decode($jwt, $this->key, array('HS256'));
			
			if($getHash != null){
				return $jwt;
			}else{
				return $decode;
			}
			
			//return array("status" => "success", "data" => "Login success !!");
		}else{
			if($existUser){
				return array("status" => "error", "data" => "Password incorrect !!");
			}else{
				return array("status" => "error", "data" => "Login failed !!");
			}
		}
	}
	
	public function checkToken($jwt, $getIdentity = false){
		$auth = false;
		
		try{
			$decoded = JWT::decode($jwt, $this->key, array('HS256'));
		} catch (\UnexpectedValueException $ex) {
			$auth = false;
		} catch (\DomainException $ex) {
			$auth = false;
		}
		
		if(isset($decoded->sub)){
			$auth = true;
		}else{
			$auth = false;
		}
		
		if($getIdentity == true){
			return $decoded;
		}else{
			return $auth;
		}
	}
}