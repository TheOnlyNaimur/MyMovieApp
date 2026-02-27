import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#171717", // Neutral-900
    paddingTop: 20,
    paddingBottom: 20,
  },
  content: {
    paddingHorizontal: 16,
    paddingTop: 20,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 30,
  },
  logoFirstLetter: {
    fontSize: 42,
    fontWeight: "900",
    color: "#eab308", // Gold
  },
  logoText: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#FFFFFF",
    marginLeft: -2, // Tightens the "Industrial" typography
  },
  heroPlaceholder: {
    height: 100,
    backgroundColor: "#262626",
    borderRadius: 24,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderStyle: "dashed",
    borderColor: "#404040",
  },
  placeholderText: {
    color: "#737373",
    fontSize: 16,
  },
  // Add these to your StyleSheet.create in index_style.tsx
  movieCard: {
    width: 230,
    height: 300,
    borderRadius: 20,
    overflow: "hidden",
    backgroundColor: "#262626",
  },
  posterImage: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  carouselContainer: {
    alignItems: "center",
    marginVertical: 2,
    paddingBottom: 0,
    // backgroundColor: 'blue',
    marginBottom: 0,
    marginTop: 0,
  },

  sectionTitle: {
    color: "#FFFFFF",
    fontSize: 17,
    fontWeight: "bold",
    // marginBottom: 0,
    paddingHorizontal: 5, // Aligns it slightly away from the edge
    paddingBottom: 12, // Add space below title
  },

  // Add these to your StyleSheet.create in index_style.tsx
  rowContainer: {
    marginBottom: 24,
  },
  movieRowCard: {
    width: 140, // Smaller than carousel
    height: 210,
    borderRadius: 12,
    marginRight: 12,
    backgroundColor: "#262626",
    overflow: "hidden",
  },
  rowPoster: {
    width: "100%",
    height: "100%",
  },

  // Add these to your index_style.tsx
  castContainer: {
    marginVertical: 24,
    paddingHorizontal: 16,
  },
  castMember: {
    marginRight: 16,
    alignItems: "center",
    width: 80,
  },
  castImage: {
    width: 70,
    height: 70,
    borderRadius: 35, // Perfect circle
    borderWidth: 1,
    borderColor: "#404040",
  },
  castName: {
    color: "white",
    fontSize: 12,
    marginTop: 6,
    textAlign: "center",
  },
  characterName: {
    color: "#A3A3A3",
    fontSize: 10,
    textAlign: "center",
  },
});

export { styles };
