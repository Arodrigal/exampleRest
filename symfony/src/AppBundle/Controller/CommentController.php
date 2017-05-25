<?php

namespace AppBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Validator\Constraints as Assert;
use Symfony\Component\HttpFoundation\JsonResponse;
use BackendBundle\Entity\User;
use BackendBundle\Entity\Video;
use BackendBundle\Entity\Comment;

class CommentController extends Controller {

	public function newAction(Request $request, $id = null) {
		$helpers = $this->get("app.helpers");

		$hash = $request->get("authorization", null);
		$authCheck = $helpers->authCheck($hash);

		if ($authCheck == true) {
			$identity = $helpers->authCheck($hash, true);
					
			$json = $request->get("json", null);
			
			if($json != null){
				$params = json_decode($json);
				
				$createdAt = new \Datetime('now');
				$user_id = (isset($identity->sub)) ? $identity->sub : null;
				$video_id = (isset($params->video_id)) ? $params->video_id : null;
				$body =  (isset($params->body)) ? $params->body : null;
				
				if($user_id != null && $video_id != null){
					$em = $this->getDoctrine()->getManager();
					
					$user = $em->getRepository("BackendBundle:User")->findOneBy(
						array(
							"id" => $user_id
						)
					);
				
					$video = $em->getRepository("BackendBundle:Video")->findOneBy(
						array(
							"id" => $video_id
						)
					);
				
					$comment = new Comment();
					$comment->setUser($user);
					$comment->setVideo($video);
					$comment->setBody($body);
					$comment->setCreatedAt($createdAt);

					$em->persist($comment);
					$em->flush();

					$data["status"] = 'Success';
					$data["code"] = 200;
					$data["msg"] = 'New comment created !!';
					
				}else{
					$data = array(
						"status" => "Error",
						"code" => 400,
						"msg" => "Comment not created !!"
					);
					
				}
				
			}else{
				$data = array(
					"status" => "Error",
					"code" => 400,
					"msg" => "Param not valid"
				);
				
			}
			
		}else {
			$data = array(
				"status" => "Error",
				"code" => 400,
				"msg" => "Authorization not valid"
			);
		}

		return $helpers->json($data);
	}
	
	public function deleteAction(Request $request, $id = null) {
		$helpers = $this->get("app.helpers");

		$hash = $request->get("authorization", null);
		$authCheck = $helpers->authCheck($hash);

		if ($authCheck == true) {
			$identity = $helpers->authCheck($hash, true);
			
			$user_id = (isset($identity->sub)) ? $identity->sub : null;
			
			$em = $this->getDoctrine()->getManager();
					
			$comment = $em->getRepository("BackendBundle:Comment")->findOneBy(
				array(
					"id" => $id
				)
			);
			
			if(is_object($comment) && $user_id != null){
				if(isset($identity->sub) && 
					($identity->sub == $comment->getUser()->getId() ||
					$identity->sub == $comment->getVideo()->getUser()->getId()
				)){
					$em->remove($comment);
					$em->flush();
				
					$data = array(
						"status" => "Success",
						"code" => 200,
						"msg" => "Comment deleted success !!"
					);
										
				}else{
					$data = array(
						"status" => "Error",
						"code" => 400,
						"msg" => "Comment not deleted 1 !!"
					);
				}
			}else{
				$data = array(
					"status" => "Error",
					"code" => 400,
					"msg" => "Comment not deleted 2!!"
				);
			}			
		}else {
			$data = array(
				"status" => "Error",
				"code" => 400,
				"msg" => "Authorization not valid"
			);
		}

		return $helpers->json($data);
	}
	
	public function listAction(Request $request, $id=null) {
		$helpers = $this->get("app.helpers");
		
		$em = $this->getDoctrine()->getManager();

		$video = $em->getRepository("BackendBundle:Video")->findOneBy(
			array(
				"id" => $id
			)
		);
		
		$comments = $em->getRepository("BackendBundle:Comment")->findBy(
			array(
				"video" => $video
			)
		);
		
		if(count($comments) > 0){
			$data = array(
				"status" => "Success",
				"code" => 200,
				"data" => $comments,
			);
		}else{
			$data = array(
				"status" => "Error",
				"code" => 400,
				"msg" => "Do not exist comments in this video !!"
			);
		}
				
		return $helpers->json($data);
	}
}
