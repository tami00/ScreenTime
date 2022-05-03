import pandas as pd
import numpy as np
from sklearn.feature_extraction.text import CountVectorizer
from sklearn.metrics.pairwise import cosine_similarity

def read_csv():
  # read CSV file
  df = pd.read_csv("movie_dataset.csv")
  # print(df.columns)

  #select features from each movie
  features = ['keywords', 'cast', 'genres', 'director']

  #get rid of empty data in features
  for feature in features:
      df[feature] = df[feature].fillna('')

  df["combined_features"] = df.apply(combined_features, axis=1)
  return df


def get_title_from_index(df, index):
    return df[df.index == index]["title"].values[0] 

def get_index_from_title(df, title):
  try:
    return df[df.title == title]["index"].values[0]
  except:
    return -1 #Index Doesnt exist


#create column combines all selected features
def combined_features(row):
    try:
        return row['keywords'] + " " + row['cast'] + " " + row['genres'] + " " + row['director']
    except:
        print ("ERROR:", row)



def similar_movies(title):
  df = read_csv()
  cv = CountVectorizer()

  count_matrix = cv.fit_transform(df["combined_features"])
  #cosine similarity based on count matrix
  cosine_sim = cosine_similarity(count_matrix)
  movie_user_likes = title
  movie_index = get_index_from_title(df, movie_user_likes)
  if (movie_index == -1): return []

  similar_movies = list(enumerate(cosine_sim[movie_index]))
  sorted_similar_movies = sorted(similar_movies, key= lambda x:x[1], reverse=True)
  i=0
  movieTitles = []
  for movie in sorted_similar_movies: 
      movieTitles.append(get_title_from_index(df, movie[0]))
      # print (get_title_from_index(df, movie[0]))
      i=i+1
      if i>5:
          break
  return movieTitles




def calculate_recommended(likedMovies):
  # print(likedMovies)

  similar_movie_list = [] #2D Array [fromMovie][Reccomendation]
  for title in likedMovies:
    similar_movie_list.append(similar_movies(title))

  # print(similar_movie_list)
  #Convert the 2D array above into one
  #Grab first index from each array inside the array and append that to a new array
  # continue with 2nd, third index etc.
  sorted_movie_recomendations = []
  for j in range(0, len(similar_movie_list) + 1):
    for i in range(0, 7): #max recomendations similar_movies returns
      try:
        sorted_movie_recomendations.append(similar_movie_list[i][j])
      except:
        pass

  #Removes any items that are in the users favourites.
  sorted_movie_recomendations = [i for i in sorted_movie_recomendations if i not in likedMovies]
  return sorted_movie_recomendations[:30]