<?php

namespace App\Controller;

use App\Entity\Annonce;
use App\Entity\Categorie;
use App\Repository\AnnonceRepository;
use App\Repository\CategorieRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\ParamConverter;
use Symfony\Component\Serializer\Encoder\JsonEncoder;
use Symfony\Component\Serializer\Exception\NotEncodableValueException;
use Symfony\Component\Serializer\SerializerInterface;
use Symfony\Component\Validator\Validator\ValidatorInterface;

class AnnonceController extends AbstractController
{
    private $annonceRepository;
    private $categorieRepository;
    private $serializer;
    private $validator;
    private $em;

    public function __construct(
        AnnonceRepository $annonceRepository,
        CategorieRepository $categorieRepository,
        SerializerInterface $serializer,
        ValidatorInterface $validator,
        EntityManagerInterface $em
    ){
        $this->annonceRepository= $annonceRepository;
        $this->categorieRepository = $categorieRepository;
        $this->serializer = $serializer;
        $this->validator = $validator;
        $this->em = $em;
    }

    /**
     * @Route("/annonces", name="annonces", methods={"GET"})
     */
    public function index(): Response
    {
        $annonces = $this->annonceRepository->findAll();
        $data = $this->serializer->serialize($annonces, JsonEncoder::FORMAT, [
            'circular_reference_handler' => function ($object) {
                return null;
            }
        ]);

        return new JsonResponse([
            "annonces" => $data
        ], Response::HTTP_OK);
    }

    /**
     * @Route("/annonces/{id}", name="getById", methods={"GET"})
     * @ParamConverter("annonce", options={"mapping": {"id" = "id"}})
     */
    public function getById(Annonce $annonce): Response
    {
        $data = $this->serializer->serialize($annonce, JsonEncoder::FORMAT, [
            'circular_reference_handler' => function ($object) {
                return null;
            }
        ]);
        return new JsonResponse([
            "annonce" => $data
        ], Response::HTTP_OK);
    }

    /**
     * @Route("/annonces", name="newAnnonce", methods={"POST"})
     */
    public function newAnnonce(Request $request): Response
    {
        try{
            $content = $request->getContent();
            $caregorieId = json_decode($content)->categorie;
            $annonce = $this->serializer->deserialize($content, Annonce::class, 'json');
            $annonce->setCategorie($this->categorieRepository->find($caregorieId));

            $errors = $this->validator->validate($annonce);

            if(!($annonce instanceof Annonce) || count($errors) > 0){
                return new JsonResponse([
                    "status" => Response::HTTP_BAD_REQUEST,
                    "messages" => json_encode($errors) // TODO résupérer les messages
                ], Response::HTTP_BAD_REQUEST);
            }

            $this->em->persist($annonce);
            $this->em->flush();

            $data = $this->serializer->serialize($annonce, JsonEncoder::FORMAT, [
                'circular_reference_handler' => function ($object) {
                    return null;
                }
            ]);
            return new JsonResponse(["annonce" => $data], Response::HTTP_CREATED);
        }catch (NotEncodableValueException $e){
            return new JsonResponse([
                "status" => Response::HTTP_BAD_REQUEST,
                "message"=> $e->getMessage()
            ], Response::HTTP_BAD_REQUEST);
        }

    }

    /**
     * @Route("/annonces/{id}", name="updateAnnonce", methods={"PUT"})
     * @ParamConverter("annonce", options={"mapping": {"id" = "id"}})
     */
    public function updateAnnonce(Annonce $oldannonce, Request $request): Response
    {
        try {

            $content = $request->getContent();
            $caregorieId = json_decode($content)->categorie;
            $annonce = $this->serializer->deserialize($content, Annonce::class, 'json');
            $annonce->setCategorie($this->categorieRepository->find($caregorieId));

            $errors = $this->validator->validate($annonce);

            if(!($annonce instanceof Annonce) || count($errors) > 0){
                return new JsonResponse([
                    "status" => Response::HTTP_BAD_REQUEST,
                    "messages" => json_encode($errors) // TODO résupérer les messages
                ], Response::HTTP_BAD_REQUEST);
            }
            $oldannonce->setNomProduit($annonce->getNomProduit());
            $oldannonce->setDescription($annonce->getDescription());
            $oldannonce->setPrix($annonce->getPrix());
            $oldannonce->setCategorie($annonce->getCategorie());

            $this->em->persist($oldannonce);
            $this->em->flush();
            $data = $this->serializer->serialize($oldannonce, JsonEncoder::FORMAT, [
                'circular_reference_handler' => function ($object) {
                    return null;
                }
            ]);
            return new JsonResponse(["annonce" => $data], Response::HTTP_CREATED);
        }catch (NotEncodableValueException $e){
            return new JsonResponse([
                "status" => Response::HTTP_BAD_REQUEST,
                "message"=> $e->getMessage()
            ], Response::HTTP_BAD_REQUEST);
        }
    }

    /**
     * @Route("/annonces/{id}", name="deleteAnnonce", methods={"DELETE"})
     * @ParamConverter("annonce", options={"mapping": {"id" = "id"}})
     */
    public function deleteAnnonce(Annonce $annonce): Response
    {
        $this->em->remove($annonce);
        $this->em->flush();
        return new JsonResponse([],Response::HTTP_OK);
    }
}
