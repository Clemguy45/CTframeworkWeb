<?php

namespace App\DataFixtures;

use App\Entity\Categorie;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Persistence\ObjectManager;

class CategorieFixture extends Fixture
{
    public function load(ObjectManager $manager)
    {
        $faker = \Faker\Factory::create("fr_FR");

        for($i=0; $i <= 5; $i++){

            $categorie = new Categorie();
            $categorie->setNomCategorie($faker->word);

            $manager->persist($categorie);
            $this->addReference('categorie_'.$i,$categorie);
        }
        $manager->flush();
    }

}



