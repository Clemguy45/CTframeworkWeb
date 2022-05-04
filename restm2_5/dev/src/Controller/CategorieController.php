<?php

namespace App\Controller;

use App\Entity\Annonce;
use App\Entity\Categorie;
use App\Repository\AnnonceRepository;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\ParamConverter;
use App\Repository\CategorieRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Serializer\Encoder\JsonEncoder;
use Symfony\Component\Serializer\Exception\NotEncodableValueException;
use Symfony\Component\Serializer\SerializerInterface;
use Symfony\Component\Validator\Validator\ValidatorInterface;

class CategorieController extends AbstractController
{
    private $categorieRepository;
    private $serializer;
    private $validator;
    private $em;

    public function __construct(
        CategorieRepository $categorieRepository,
        SerializerInterface $serializer,
        ValidatorInterface $validator,
        EntityManagerInterface $em
    ){
        $this->categorieRepository= $categorieRepository;
        $this->serializer = $serializer;
        $this->validator = $validator;
        $this->em = $em;
    }

    /**
     * @Route("/categories", name="categorie", methods={"GET"})
     */
    public function index(): Response
    {
        $categorie = $this->categorieRepository->findAll();
        $data = $this->serializer->serialize($categorie, JsonEncoder::FORMAT, [
            'circular_reference_handler' => function ($object) {
                return null;
            }
        ]);
        return new JsonResponse([
            "categories" => $data
        ], Response::HTTP_OK);
    }
    /**
     * @Route("/categories/{id}", name="getByIdCategorie", methods={"GET"})
     * @ParamConverter("categorie", options={"mapping": {"id" = "id"}})
     */
    public function getByIdCategorie(Categorie $categorie): Response
    {
        $data = $this->serializer->serialize($categorie, JsonEncoder::FORMAT, [
            'circular_reference_handler' => function ($object) {
                return null;
            }
        ]);
        return new JsonResponse([
            "categorie" => $data
        ], Response::HTTP_OK);
    }
    /**
     * @Route("/categories", name="newCategorie", methods={"POST"})
     */
    public function newCategorie(Request $request): Response
    {
        try{
            $content = $request->getContent();
            $catagorie = $this->serializer->deserialize($content, Categorie::class, 'json');

            $errors = $this->validator->validate($catagorie);

            if(count($errors) > 0){
                return new JsonResponse([
                    "status" => Response::HTTP_BAD_REQUEST,
                    "messages" => json_encode($errors) // TODO résupérer les messages
                ], Response::HTTP_BAD_REQUEST);
            }

            $this->em->persist($catagorie);
            $this->em->flush();

            $data = $this->serializer->serialize($catagorie, JsonEncoder::FORMAT, [
                'circular_reference_handler' => function ($object) {
                    return null;
                }
            ]);
            return new JsonResponse(["categorie" => $data], Response::HTTP_CREATED);
        }catch (NotEncodableValueException $e){
            return new JsonResponse([
                "status" => Response::HTTP_BAD_REQUEST,
                "message"=> $e->getMessage()
            ], Response::HTTP_BAD_REQUEST);

        }

    }

    /**
     * @Route("/categories/{id}", name="updateCategorie", methods={"PUT"})
     * @ParamConverter("categorie", options={"mapping": {"id" = "id"}})
     */
    public function updateAnnonce(Categorie $oldcategorie, Request $request): Response
    {
        try {

            $content = $request->getContent();
            $categorie = $this->serializer->deserialize($content, Categorie::class, 'json');

            $errors = $this->validator->validate($categorie);

            if(!($categorie instanceof Categorie) || count($errors) > 0){
                return new JsonResponse([
                    "status" => Response::HTTP_BAD_REQUEST,
                    "messages" => json_encode($errors) // TODO résupérer les messages
                ], Response::HTTP_BAD_REQUEST);
            }
            $oldcategorie->setNomCategorie($categorie->getNomCategorie());

            $this->em->persist($oldcategorie);
            $this->em->flush();
            $data = $this->serializer->serialize($oldcategorie, JsonEncoder::FORMAT, [
                'circular_reference_handler' => function ($object) {
                    return null;
                }
            ]);
            return new JsonResponse(["categorie" => $data], Response::HTTP_CREATED);
        }catch (NotEncodableValueException $e){
            return new JsonResponse([
                "status" => Response::HTTP_BAD_REQUEST,
                "message"=> $e->getMessage()
            ], Response::HTTP_BAD_REQUEST);
        }
    }


    /**
     * @Route("/categories/{id}", name="deleteCategorie", methods={"DELETE"})
     * @ParamConverter("categorie", options={"mapping": {"id" = "id"}})
     */
    public function deleteCategorie(Categorie $categorie): Response
    {
        $this->em->remove($categorie);
        $this->em->flush();
        return new JsonResponse([],Response::HTTP_OK);
    }
}
